import { motion } from "framer-motion";

const recentBookings = [
  "Arijit Singh - Corporate Event in Mumbai",
  "Priyanka Chopra - Wedding in Delhi",
  "Kapil Sharma - Private Party in Bangalore",
  "Bhuvan Bam - College Festival in Pune",
  "Virat Kohli - Product Launch in Hyderabad",
  "Madhuri Dixit - Charity Gala in Chennai",
  "Zakir Khan - Comedy Show in Kolkata",
];

export function ScrollingTicker() {
  return (
    <div className="border-y border-white/10 bg-card/50 overflow-hidden py-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6">
          Recently Booked For
        </span>
      </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...recentBookings, ...recentBookings, ...recentBookings].map((booking, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{booking}</span>
              <span className="text-primary">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
