import mongoose, { Schema, Document } from "mongoose";
import type { Celebrity, Enquiry } from "@shared/schema";

export interface CelebrityDocument extends Omit<Celebrity, 'id'>, Document {
  _id: string;
}

export interface EnquiryDocument extends Omit<Enquiry, 'id'>, Document {
  _id: string;
}

const celebritySchema = new Schema<CelebrityDocument>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  socialLinks: { type: [String], required: true },
  gender: { type: String, required: true },
  language: { type: [String], required: true },
  location: { type: String, required: true },
  eventTypes: { type: [String], required: true },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, {
  timestamps: false,
  toJSON: {
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const enquirySchema = new Schema<EnquiryDocument>({
  celebrityId: { type: String, required: true },
  celebrityName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  purpose: { type: String, required: true },
  createdAt: { type: String, required: true },
}, {
  timestamps: false,
  toJSON: {
    transform: (_doc, ret: any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const CelebrityModel = mongoose.model<CelebrityDocument>('Celebrity', celebritySchema);
export const EnquiryModel = mongoose.model<EnquiryDocument>('Enquiry', enquirySchema);
