import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEnquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all celebrities
  app.get("/api/celebrities", async (req, res) => {
    try {
      const celebrities = await storage.getAllCelebrities();
      res.json(celebrities);
    } catch (error) {
      console.error("Error fetching celebrities:", error);
      res.status(500).json({ error: "Failed to fetch celebrities" });
    }
  });

  // Get celebrity by ID
  app.get("/api/celebrities/:id", async (req, res) => {
    try {
      const celebrity = await storage.getCelebrityById(req.params.id);
      if (!celebrity) {
        return res.status(404).json({ error: "Celebrity not found" });
      }
      res.json(celebrity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch celebrity" });
    }
  });

  // Increment celebrity views
  app.post("/api/celebrities/:id/view", async (req, res) => {
    try {
      await storage.incrementCelebrityViews(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  // Create enquiry
  app.post("/api/enquiries", async (req, res) => {
    try {
      const validatedData = insertEnquirySchema.parse(req.body);
      const enquiry = await storage.createEnquiry(validatedData);
      res.status(201).json(enquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid enquiry data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create enquiry" });
    }
  });

  // Get all enquiries (for admin/analytics)
  app.get("/api/enquiries", async (req, res) => {
    try {
      const enquiries = await storage.getAllEnquiries();
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enquiries" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
