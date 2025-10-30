import { type Celebrity, type InsertCelebrity, type Enquiry, type InsertEnquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Celebrity operations
  getAllCelebrities(): Promise<Celebrity[]>;
  getCelebrityById(id: string): Promise<Celebrity | undefined>;
  getCelebrityBySlug(slug: string): Promise<Celebrity | undefined>;
  getCelebritiesByCategory(category: string): Promise<Celebrity[]>;
  createCelebrity(celebrity: InsertCelebrity): Promise<Celebrity>;
  incrementCelebrityViews(id: string): Promise<void>;
  
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
    const sampleCelebrities: InsertCelebrity[] = [
      {
        name: "Priya Sharma",
        slug: "priya-sharma",
        category: "Singers",
        image: "/attached_assets/generated_images/Elegant_female_singer_portrait_36ed9407.png",
        bio: "Award-winning playback singer known for her versatile voice across multiple genres. With over 500 songs to her credit, she has captivated audiences worldwide with her soulful performances and chart-topping hits.",
        achievements: [
          "National Film Award for Best Female Playback Singer",
          "3 Filmfare Awards",
          "Performed at Madison Square Garden",
          "50+ Million streams on Spotify"
        ],
        socialLinks: [
          "https://instagram.com/priyasharma",
          "https://youtube.com/priyasharma",
          "https://twitter.com/priyasharma"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        gender: "Female",
        language: ["Hindi", "English", "Tamil"],
        location: "Mumbai",
        priceRange: "Premium",
        eventTypes: ["Wedding", "Concert", "Corporate"],
        isFeatured: true,
      },
      {
        name: "Rajesh Kumar",
        slug: "rajesh-kumar",
        category: "Actors",
        image: "/attached_assets/generated_images/Professional_male_actor_headshot_a0a56235.png",
        bio: "Acclaimed Bollywood actor with a career spanning two decades. Known for his intense performances and versatility, he has won hearts with his powerful portrayals in both commercial and independent cinema.",
        achievements: [
          "2 National Film Awards",
          "5 Filmfare Awards for Best Actor",
          "Padma Shri Recipient",
          "Over 75 films across multiple languages"
        ],
        socialLinks: [
          "https://instagram.com/rajeshkumar",
          "https://twitter.com/rajeshkumar",
          "https://facebook.com/rajeshkumar"
        ],
        videoUrl: "",
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Mumbai",
        priceRange: "Premium",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: true,
      },
      {
        name: "Amit Tandon",
        slug: "amit-tandon",
        category: "Comedians",
        image: "/attached_assets/generated_images/Comedian_performing_on_stage_864e615e.png",
        bio: "Stand-up comedian extraordinaire who brings the house down with his observational humor and witty takes on everyday life. His unique style and relatable content have made him a favorite across India.",
        achievements: [
          "5 Million+ YouTube subscribers",
          "Amazon Prime Special 'Laugh Out Loud'",
          "Toured 50+ cities worldwide",
          "Comedy Central India Star Performer"
        ],
        socialLinks: [
          "https://instagram.com/amittandon",
          "https://youtube.com/amittandon",
          "https://twitter.com/amittandon"
        ],
        videoUrl: "",
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Delhi",
        priceRange: "Mid-Range",
        eventTypes: ["Corporate", "Private Party", "Wedding"],
        isFeatured: false,
      },
      {
        name: "Neha Patel",
        slug: "neha-patel",
        category: "Influencers",
        image: "/attached_assets/generated_images/Modern_social_media_influencer_37f081d2.png",
        bio: "Digital content creator and lifestyle influencer with a massive following. Known for her authentic content on fashion, travel, and lifestyle, she has collaborated with top brands and inspired millions.",
        achievements: [
          "10 Million+ Instagram followers",
          "Featured in Forbes 30 Under 30",
          "Brand partnerships with 100+ companies",
          "Travel & Lifestyle Blog of the Year"
        ],
        socialLinks: [
          "https://instagram.com/nehapatel",
          "https://youtube.com/nehapatel",
          "https://twitter.com/nehapatel"
        ],
        videoUrl: "",
        gender: "Female",
        language: ["Hindi", "English", "Gujarati"],
        location: "Bangalore",
        priceRange: "Mid-Range",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: true,
      },
      {
        name: "Vikram Singh",
        slug: "vikram-singh",
        category: "Choreographers",
        image: "/attached_assets/generated_images/Professional_choreographer_dancing_36eaf6d7.png",
        bio: "Celebrity choreographer who has redefined dance in Indian cinema. His innovative choreography and unique style have made him the go-to choice for Bollywood's biggest productions.",
        achievements: [
          "Choreographed 200+ films",
          "3 National Film Awards",
          "International Dance Award Winner",
          "Mentored 1000+ aspiring dancers"
        ],
        socialLinks: [
          "https://instagram.com/vikramsingh",
          "https://youtube.com/vikramsingh",
          "https://facebook.com/vikramsingh"
        ],
        videoUrl: "",
        gender: "Male",
        language: ["Hindi", "English", "Punjabi"],
        location: "Mumbai",
        priceRange: "Premium",
        eventTypes: ["Wedding", "Corporate", "Concert"],
        isFeatured: false,
      },
      {
        name: "Chef Ritu Malhotra",
        slug: "chef-ritu-malhotra",
        category: "Chefs",
        image: "/attached_assets/generated_images/Celebrity_chef_professional_portrait_882fe472.png",
        bio: "Celebrity chef and culinary innovator who brings traditional Indian flavors to modern cuisine. Her restaurants have won multiple Michelin stars and she's a beloved TV personality.",
        achievements: [
          "2 Michelin Star Restaurants",
          "MasterChef India Judge",
          "Author of 5 bestselling cookbooks",
          "Times Food Awards - Chef of the Year"
        ],
        socialLinks: [
          "https://instagram.com/chefritu",
          "https://youtube.com/chefritu",
          "https://twitter.com/chefritu"
        ],
        videoUrl: "",
        gender: "Female",
        language: ["Hindi", "English"],
        location: "Delhi",
        priceRange: "Premium",
        eventTypes: ["Corporate", "Private Party"],
        isFeatured: false,
      },
      {
        name: "Dr. Arun Sharma",
        slug: "dr-arun-sharma",
        category: "Motivational Speakers",
        image: "/attached_assets/generated_images/Motivational_speaker_on_stage_6391bb2e.png",
        bio: "Renowned motivational speaker and life coach who has transformed millions of lives with his powerful messages. His talks on leadership, success, and personal growth are legendary.",
        achievements: [
          "Addressed 2000+ corporate events",
          "Bestselling author of 8 books",
          "TEDx Speaker with 20M+ views",
          "Awarded India's Top Motivational Speaker"
        ],
        socialLinks: [
          "https://instagram.com/drarunsharma",
          "https://youtube.com/drarunsharma",
          "https://twitter.com/drarunsharma"
        ],
        videoUrl: "",
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Hyderabad",
        priceRange: "Premium",
        eventTypes: ["Corporate"],
        isFeatured: true,
      },
      {
        name: "Arjun Mehta",
        slug: "arjun-mehta",
        category: "Singers",
        image: "/attached_assets/generated_images/Young_male_musician_portrait_655aec8f.png",
        bio: "Young and talented singer-songwriter who has taken the indie music scene by storm. His soulful voice and original compositions have earned him a dedicated fanbase.",
        achievements: [
          "MTV Unplugged Season Winner",
          "3 Million+ Spotify monthly listeners",
          "Performed at Sunburn Festival",
          "YouTube Silver Play Button"
        ],
        socialLinks: [
          "https://instagram.com/arjunmehta",
          "https://youtube.com/arjunmehta",
          "https://twitter.com/arjunmehta"
        ],
        videoUrl: "",
        gender: "Male",
        language: ["Hindi", "English"],
        location: "Bangalore",
        priceRange: "Budget",
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
    const celebrity: Celebrity = { ...insertCelebrity, id, views: 0 };
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

export const storage = new MemStorage();
