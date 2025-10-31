import { type Celebrity, type InsertCelebrity, type Enquiry, type InsertEnquiry } from "@shared/schema";
import { randomUUID } from "crypto";
import { CelebrityModel, EnquiryModel } from "./models";
import { connectToMongoDB } from "./db";

export interface IStorage {
  // Celebrity operations
  getAllCelebrities(): Promise<Celebrity[]>;
  getCelebrityById(id: string): Promise<Celebrity | undefined>;
  getCelebrityBySlug(slug: string): Promise<Celebrity | undefined>;
  getCelebritiesByCategory(category: string): Promise<Celebrity[]>;
  createCelebrity(celebrity: InsertCelebrity): Promise<Celebrity>;
  incrementCelebrityViews(id: string): Promise<void>;
  incrementCelebrityLikes(id: string): Promise<void>;
  decrementCelebrityLikes(id: string): Promise<void>;
  
  // Enquiry operations
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  getAllEnquiries(): Promise<Enquiry[]>;
}

export class MemStorage implements IStorage {
  private celebrities: Map<string, Celebrity>;
  private enquiries: Map<string, Enquiry>;

  constructor() {
    this.celebrities = new Map();
    this.enquiries = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleCelebrities: Omit<Celebrity, 'id' | 'views' | 'likes'>[] = [
      {
        name: "Priya Sharma",
        slug: "priya-sharma",
        category: "Singers",
        image: "/attached_assets/generated_images/Elegant_female_singer_portrait_36ed9407.png",
        bio: "Award-winning playback singer known for her versatile voice across multiple genres. With over 500 songs to her credit, she has captivated audiences worldwide with her soulful performances and chart-topping hits.",
        socialLinks: [
          "https://instagram.com/priyasharma",
          "https://youtube.com/priyasharma",
          "https://twitter.com/priyasharma"
        ],
        gender: "Female",
        language: ["Hindi", "English", "Tamil"],
        location: "Mumbai",
        eventTypes: ["Wedding", "Concert", "Corporate"],
        isFeatured: true,
      },
      {
        name: "Rajesh Kumar",
        slug: "rajesh-kumar",
        category: "Actors",
        image: "/attached_assets/generated_images/Professional_male_actor_headshot_a0a56235.png",
        bio: "Acclaimed Bollywood actor with a career spanning two decades. Known for his intense performances and versatility, he has won hearts with his powerful portrayals in both commercial and independent cinema.",
        socialLinks: [
          "https://instagram.com/rajeshkumar",
          "https://twitter.com/rajeshkumar",
          "https://facebook.com/rajeshkumar"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Mumbai",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: true,
      },
      {
        name: "Amit Tandon",
        slug: "amit-tandon",
        category: "Comedians",
        image: "/attached_assets/generated_images/Comedian_performing_on_stage_864e615e.png",
        bio: "Stand-up comedian extraordinaire who brings the house down with his observational humor and witty takes on everyday life. His unique style and relatable content have made him a favorite across India.",
        socialLinks: [
          "https://instagram.com/amittandon",
          "https://youtube.com/amittandon",
          "https://twitter.com/amittandon"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Delhi",
        eventTypes: ["Corporate", "Private Party", "Wedding"],
        isFeatured: false,
      },
      {
        name: "Neha Patel",
        slug: "neha-patel",
        category: "Influencers",
        image: "/attached_assets/generated_images/Modern_social_media_influencer_37f081d2.png",
        bio: "Digital content creator and lifestyle influencer with a massive following. Known for her authentic content on fashion, travel, and lifestyle, she has collaborated with top brands and inspired millions.",
        socialLinks: [
          "https://instagram.com/nehapatel",
          "https://youtube.com/nehapatel",
          "https://twitter.com/nehapatel"
        ],
        gender: "Female",
        language: ["Hindi", "English", "Gujarati"],
        location: "Bangalore",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: true,
      },
      {
        name: "Vikram Singh",
        slug: "vikram-singh",
        category: "Choreographers",
        image: "/attached_assets/generated_images/Professional_choreographer_dancing_36eaf6d7.png",
        bio: "Celebrity choreographer who has redefined dance in Indian cinema. His innovative choreography and unique style have made him the go-to choice for Bollywood's biggest productions.",
        socialLinks: [
          "https://instagram.com/vikramsingh",
          "https://youtube.com/vikramsingh",
          "https://facebook.com/vikramsingh"
        ],
        gender: "Male",
        language: ["Hindi", "English", "Punjabi"],
        location: "Mumbai",
        eventTypes: ["Wedding", "Corporate", "Concert"],
        isFeatured: false,
      },
      {
        name: "Chef Ritu Malhotra",
        slug: "chef-ritu-malhotra",
        category: "Chefs",
        image: "/attached_assets/generated_images/Celebrity_chef_professional_portrait_882fe472.png",
        bio: "Celebrity chef and culinary innovator who brings traditional Indian flavors to modern cuisine. Her restaurants have won multiple Michelin stars and she's a beloved TV personality.",
        socialLinks: [
          "https://instagram.com/chefritu",
          "https://youtube.com/chefritu",
          "https://twitter.com/chefritu"
        ],
        gender: "Female",
        language: ["Hindi", "English"],
        location: "Delhi",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: false,
      },
      {
        name: "Dr. Arun Sharma",
        slug: "dr-arun-sharma",
        category: "Motivational Speakers",
        image: "/attached_assets/generated_images/Motivational_speaker_on_stage_6391bb2e.png",
        bio: "Renowned motivational speaker and life coach who has transformed millions of lives with his powerful messages. His talks on leadership, success, and personal growth are legendary.",
        socialLinks: [
          "https://instagram.com/drarunsharma",
          "https://youtube.com/drarunsharma",
          "https://twitter.com/drarunsharma"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Hyderabad",
        eventTypes: ["Corporate"],
        isFeatured: true,
      },
      {
        name: "Arjun Mehta",
        slug: "arjun-mehta",
        category: "Singers",
        image: "/attached_assets/generated_images/Young_male_musician_portrait_655aec8f.png",
        bio: "Young and talented singer-songwriter who has taken the indie music scene by storm. His soulful voice and original compositions have earned him a dedicated fanbase.",
        socialLinks: [
          "https://instagram.com/arjunmehta",
          "https://youtube.com/arjunmehta",
          "https://twitter.com/arjunmehta"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Bangalore",
        eventTypes: ["Wedding", "Concert", "Private Party"],
        isFeatured: false,
      },
    ];

    sampleCelebrities.forEach((celeb) => {
      const id = randomUUID();
      this.celebrities.set(id, {
        ...celeb,
        id,
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 500),
      });
    });
  }

  async getAllCelebrities(): Promise<Celebrity[]> {
    return Array.from(this.celebrities.values());
  }

  async getCelebrityById(id: string): Promise<Celebrity | undefined> {
    return this.celebrities.get(id);
  }

  async getCelebrityBySlug(slug: string): Promise<Celebrity | undefined> {
    return Array.from(this.celebrities.values()).find((c) => c.slug === slug);
  }

  async getCelebritiesByCategory(category: string): Promise<Celebrity[]> {
    return Array.from(this.celebrities.values()).filter((c) => c.category === category);
  }

  async createCelebrity(insertCelebrity: InsertCelebrity): Promise<Celebrity> {
    const id = randomUUID();
    const celebrity: Celebrity = { 
      ...insertCelebrity, 
      id, 
      views: 0,
      likes: 0,
      isFeatured: insertCelebrity.isFeatured ?? false
    };
    this.celebrities.set(id, celebrity);
    return celebrity;
  }

  async incrementCelebrityViews(id: string): Promise<void> {
    const celebrity = this.celebrities.get(id);
    if (celebrity) {
      celebrity.views += 1;
      this.celebrities.set(id, celebrity);
    }
  }

  async incrementCelebrityLikes(id: string): Promise<void> {
    const celebrity = this.celebrities.get(id);
    if (celebrity) {
      celebrity.likes += 1;
      this.celebrities.set(id, celebrity);
    }
  }

  async decrementCelebrityLikes(id: string): Promise<void> {
    const celebrity = this.celebrities.get(id);
    if (celebrity && celebrity.likes > 0) {
      celebrity.likes -= 1;
      this.celebrities.set(id, celebrity);
    }
  }

  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    const id = randomUUID();
    const enquiry: Enquiry = {
      ...insertEnquiry,
      id,
      createdAt: new Date().toISOString(),
    };
    this.enquiries.set(id, enquiry);
    return enquiry;
  }

  async getAllEnquiries(): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values());
  }
}

export class MongoStorage implements IStorage {
  private isInitialized = false;

  private async initialize() {
    if (this.isInitialized) return;
    
    await connectToMongoDB();
    await this.seedDataIfEmpty();
    this.isInitialized = true;
  }

  private async seedDataIfEmpty() {
    const count = await CelebrityModel.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} celebrities`);
      return;
    }

    console.log("Seeding database with initial data...");
    
    const sampleCelebrities: any[] = [
      {
        name: "Priya Sharma",
        slug: "priya-sharma",
        category: "Singers",
        image: "/attached_assets/generated_images/Elegant_female_singer_portrait_36ed9407.png",
        bio: "Award-winning playback singer known for her versatile voice across multiple genres. With over 500 songs to her credit, she has captivated audiences worldwide with her soulful performances and chart-topping hits.",
        socialLinks: [
          "https://instagram.com/priyasharma",
          "https://youtube.com/priyasharma",
          "https://twitter.com/priyasharma"
        ],
        gender: "Female",
        language: ["Hindi", "English", "Tamil"],
        location: "Mumbai",
        eventTypes: ["Wedding", "Concert", "Corporate"],
        isFeatured: true,
      },
      {
        name: "Rajesh Kumar",
        slug: "rajesh-kumar",
        category: "Actors",
        image: "/attached_assets/generated_images/Professional_male_actor_headshot_a0a56235.png",
        bio: "Acclaimed Bollywood actor with a career spanning two decades. Known for his intense performances and versatility, he has won hearts with his powerful portrayals in both commercial and independent cinema.",
        socialLinks: [
          "https://instagram.com/rajeshkumar",
          "https://twitter.com/rajeshkumar",
          "https://facebook.com/rajeshkumar"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Mumbai",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: true,
      },
      {
        name: "Amit Tandon",
        slug: "amit-tandon",
        category: "Comedians",
        image: "/attached_assets/generated_images/Comedian_performing_on_stage_864e615e.png",
        bio: "Stand-up comedian extraordinaire who brings the house down with his observational humor and witty takes on everyday life. His unique style and relatable content have made him a favorite across India.",
        socialLinks: [
          "https://instagram.com/amittandon",
          "https://youtube.com/amittandon",
          "https://twitter.com/amittandon"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Delhi",
        eventTypes: ["Corporate", "Private Party", "Wedding"],
        isFeatured: false,
      },
      {
        name: "Neha Patel",
        slug: "neha-patel",
        category: "Influencers",
        image: "/attached_assets/generated_images/Modern_social_media_influencer_37f081d2.png",
        bio: "Digital content creator and lifestyle influencer with a massive following. Known for her authentic content on fashion, travel, and lifestyle, she has collaborated with top brands and inspired millions.",
        socialLinks: [
          "https://instagram.com/nehapatel",
          "https://youtube.com/nehapatel",
          "https://twitter.com/nehapatel"
        ],
        gender: "Female",
        language: ["Hindi", "English", "Gujarati"],
        location: "Bangalore",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: true,
      },
      {
        name: "Vikram Singh",
        slug: "vikram-singh",
        category: "Choreographers",
        image: "/attached_assets/generated_images/Professional_choreographer_dancing_36eaf6d7.png",
        bio: "Celebrity choreographer who has redefined dance in Indian cinema. His innovative choreography and unique style have made him the go-to choice for Bollywood's biggest productions.",
        socialLinks: [
          "https://instagram.com/vikramsingh",
          "https://youtube.com/vikramsingh",
          "https://facebook.com/vikramsingh"
        ],
        gender: "Male",
        language: ["Hindi", "English", "Punjabi"],
        location: "Mumbai",
        eventTypes: ["Wedding", "Corporate", "Concert"],
        isFeatured: false,
      },
      {
        name: "Chef Ritu Malhotra",
        slug: "chef-ritu-malhotra",
        category: "Chefs",
        image: "/attached_assets/generated_images/Celebrity_chef_professional_portrait_882fe472.png",
        bio: "Celebrity chef and culinary innovator who brings traditional Indian flavors to modern cuisine. Her restaurants have won multiple Michelin stars and she's a beloved TV personality.",
        socialLinks: [
          "https://instagram.com/chefritu",
          "https://youtube.com/chefritu",
          "https://twitter.com/chefritu"
        ],
        gender: "Female",
        language: ["Hindi", "English"],
        location: "Delhi",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: false,
      },
      {
        name: "Dr. Arun Sharma",
        slug: "dr-arun-sharma",
        category: "Motivational Speakers",
        image: "/attached_assets/generated_images/Motivational_speaker_on_stage_6391bb2e.png",
        bio: "Renowned motivational speaker and life coach who has transformed millions of lives with his powerful messages. His talks on leadership, success, and personal growth are legendary.",
        socialLinks: [
          "https://instagram.com/drarunsharma",
          "https://youtube.com/drarunsharma",
          "https://twitter.com/drarunsharma"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Hyderabad",
        eventTypes: ["Corporate"],
        isFeatured: true,
      },
      {
        name: "Arjun Mehta",
        slug: "arjun-mehta",
        category: "Singers",
        image: "/attached_assets/generated_images/Young_male_musician_portrait_655aec8f.png",
        bio: "Young and talented singer-songwriter who has taken the indie music scene by storm. His soulful voice and original compositions have earned him a dedicated fanbase.",
        socialLinks: [
          "https://instagram.com/arjunmehta",
          "https://youtube.com/arjunmehta",
          "https://twitter.com/arjunmehta"
        ],
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Bangalore",
        eventTypes: ["Wedding", "Concert", "Private Party"],
        isFeatured: false,
      },
    ];

    await CelebrityModel.insertMany(
      sampleCelebrities.map(celeb => ({
        ...celeb,
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 500),
      }))
    );

    console.log(`✓ Seeded ${sampleCelebrities.length} celebrities`);
  }

  async getAllCelebrities(): Promise<Celebrity[]> {
    await this.initialize();
    const celebrities = await CelebrityModel.find().lean();
    return celebrities.map(celeb => ({
      ...celeb,
      id: celeb._id.toString(),
    })) as Celebrity[];
  }

  async getCelebrityById(id: string): Promise<Celebrity | undefined> {
    await this.initialize();
    const celebrity = await CelebrityModel.findById(id).lean();
    if (!celebrity) return undefined;
    return {
      ...celebrity,
      id: celebrity._id.toString(),
    } as Celebrity;
  }

  async getCelebrityBySlug(slug: string): Promise<Celebrity | undefined> {
    await this.initialize();
    const celebrity = await CelebrityModel.findOne({ slug }).lean();
    if (!celebrity) return undefined;
    return {
      ...celebrity,
      id: celebrity._id.toString(),
    } as Celebrity;
  }

  async getCelebritiesByCategory(category: string): Promise<Celebrity[]> {
    await this.initialize();
    const celebrities = await CelebrityModel.find({ category }).lean();
    return celebrities.map(celeb => ({
      ...celeb,
      id: celeb._id.toString(),
    })) as Celebrity[];
  }

  async createCelebrity(insertCelebrity: InsertCelebrity): Promise<Celebrity> {
    await this.initialize();
    const celebrity = await CelebrityModel.create({
      ...insertCelebrity,
      views: 0,
      likes: 0,
    });
    return celebrity.toJSON() as Celebrity;
  }

  async incrementCelebrityViews(id: string): Promise<void> {
    await this.initialize();
    await CelebrityModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
  }

  async incrementCelebrityLikes(id: string): Promise<void> {
    await this.initialize();
    await CelebrityModel.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  }

  async decrementCelebrityLikes(id: string): Promise<void> {
    await this.initialize();
    await CelebrityModel.findByIdAndUpdate(
      { _id: id, likes: { $gt: 0 } },
      { $inc: { likes: -1 } }
    );
  }

  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    await this.initialize();
    const enquiry = await EnquiryModel.create({
      ...insertEnquiry,
      createdAt: new Date().toISOString(),
    });
    return enquiry.toJSON() as Enquiry;
  }

  async getAllEnquiries(): Promise<Enquiry[]> {
    await this.initialize();
    const enquiries = await EnquiryModel.find().lean();
    return enquiries.map(enq => ({
      ...enq,
      id: enq._id.toString(),
    })) as Enquiry[];
  }
}

export const storage = new MongoStorage();
