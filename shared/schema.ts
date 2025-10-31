import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const celebrities = pgTable("celebrities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  bio: text("bio").notNull(),
  socialLinks: text("social_links").array().notNull(),
  gender: text("gender").notNull(),
  language: text("language").array().notNull(),
  location: text("location").notNull(),
  eventTypes: text("event_types").array().notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
});

export const enquiries = pgTable("enquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  celebrityId: varchar("celebrity_id").notNull(),
  celebrityName: text("celebrity_name").notNull(),
  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  contact: text("contact").notNull(),
  purpose: text("purpose").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertCelebritySchema = createInsertSchema(celebrities).omit({
  id: true,
  views: true,
  likes: true,
});

export const insertEnquirySchema = createInsertSchema(enquiries).omit({
  id: true,
  createdAt: true,
});

export type InsertCelebrity = z.infer<typeof insertCelebritySchema>;
export type Celebrity = typeof celebrities.$inferSelect;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiries.$inferSelect;

export const categories = [
  "Singers",
  "Actors",
  "Actresses",
  "Comedians",
  "Influencers",
  "Choreographers",
  "Chefs",
  "Motivational Speakers",
] as const;

export type Category = typeof categories[number];
