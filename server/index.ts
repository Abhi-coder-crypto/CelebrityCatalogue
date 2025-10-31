import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  
  // Try different host configurations to handle Windows networking issues
  const hosts = ['0.0.0.0', '127.0.0.1', 'localhost'];
  let serverStarted = false;

  for (const host of hosts) {
    try {
      await new Promise<void>((resolve, reject) => {
        const listenOptions: any = { port, host };
        
        // Only use reusePort on systems that support it (not Windows)
        if (process.platform !== 'win32') {
          listenOptions.reusePort = true;
        }

        server.listen(listenOptions, () => {
          log(`serving on ${host}:${port}`);
          serverStarted = true;
          resolve();
        }).on('error', (err: NodeJS.ErrnoException) => {
          reject(err);
        });
      });
      break; // If successful, exit the loop
    } catch (err: any) {
      if (err.code === 'ENOTSUP' || err.code === 'EADDRINUSE') {
        log(`Failed to bind to ${host}:${port} - ${err.code}`);
        // Continue to next host
        continue;
      } else {
        // For other errors, throw
        throw err;
      }
    }
  }

  if (!serverStarted) {
    console.error(`Failed to start server on port ${port} with any host configuration`);
    process.exit(1);
  }
})();