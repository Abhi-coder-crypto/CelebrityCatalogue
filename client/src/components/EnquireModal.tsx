import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const enquirySchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  contact: z.string()
    .regex(/^[+]?[0-9\s\-\(\)\.]+$/, "Phone number can only contain digits, spaces, hyphens, and parentheses")
    .refine((val) => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }, "Phone number must be 10-15 digits (e.g., +91 9876543210 or 9876543210)"),
  purpose: z.string().min(10, "Please provide more details about your enquiry"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebrityId: string;
  celebrityName: string;
}

export function EnquireModal({ isOpen, onClose, celebrityId, celebrityName }: EnquireModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      userName: "",
      email: "",
      contact: "",
      purpose: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/enquiries", {
        ...data,
        celebrityId,
        celebrityName,
      });

      toast({
        title: "Enquiry Submitted Successfully!",
        description: "We've received your enquiry and will get back to you soon.",
      });

      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glassmorphic border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Enquire Now</DialogTitle>
          <DialogDescription>
            Fill in your details to book {celebrityName} for your event
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      {...field} 
                      className="glassmorphic border-white/10"
                      data-testid="input-enquiry-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com" 
                      {...field} 
                      className="glassmorphic border-white/10"
                      data-testid="input-enquiry-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel"
                      placeholder="+91 98765 43210" 
                      {...field} 
                      className="glassmorphic border-white/10"
                      data-testid="input-enquiry-contact"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of Enquiry</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your event and requirements..." 
                      {...field} 
                      className="glassmorphic border-white/10 resize-none min-h-[100px]"
                      data-testid="input-enquiry-purpose"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="glassmorphic p-3 rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold text-foreground">Celebrity:</span>
                <span className="text-primary">{celebrityName}</span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 glassmorphic border-white/10"
                data-testid="button-enquiry-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary border border-primary-border"
                data-testid="button-enquiry-submit"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Enquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
