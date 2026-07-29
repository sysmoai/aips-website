export interface TextTestimonial {
  name: string;
  role: string;
  text: string;
}

export interface VideoTestimonial {
  name: string;
  role: string;
  videoUrl: string;
  thumbnailUrl?: string;
  text?: string;
}

export const textTestimonials: TextTestimonial[] = [
  {
    name: "Rafi K.",
    role: "Freelancer",
    text: "Got my ChatGPT Plus in 8 minutes. The bKash payment was smooth and the support team guided me through everything.",
  },
  {
    name: "Tasnim A.",
    role: "Student",
    text: "I was skeptical at first but the 7-day warranty gave me confidence. My Claude Pro account works perfectly.",
  },
  {
    name: "Imran H.",
    role: "Agency Owner",
    text: "We buy 12+ subscriptions every month for our team. AI Premium Shop handles bulk orders with consistent reliability.",
  },
];

export const videoTestimonials: VideoTestimonial[] = [
  // Video testimonials can be added here with YouTube URLs or direct video URLs
  // Format: { name: "...", role: "...", videoUrl: "https://youtube.com/watch?v=..." }
  // This feature is ready for content creators to add real video testimonials
];

/**
 * Get all testimonials combined (text + video)
 */
export function getAllTestimonials() {
  return {
    textTestimonials,
    videoTestimonials,
  };
}
