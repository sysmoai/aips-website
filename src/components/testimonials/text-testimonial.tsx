import { Star } from "lucide-react";

interface TextTestimonialProps {
  name: string;
  role: string;
  text: string;
}

export function TextTestimonial({ name, role, text }: TextTestimonialProps) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-[#f4b942] text-[#f4b942]" />
        ))}
      </div>
      <p className="mt-4 text-[0.875rem] leading-relaxed text-[#8a91a8]">
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f4b942]/30 to-[#f4b942]/10 text-[0.75rem] font-bold text-[#f4b942]">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-[0.8125rem] font-semibold text-white">{name}</p>
          <p className="text-[0.6875rem] text-[#5b6280]">{role}</p>
        </div>
      </div>
    </div>
  );
}
