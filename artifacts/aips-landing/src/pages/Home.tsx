import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { 
  SiOpenai, 
  SiAnthropic, 
  SiGooglegemini, 
  SiGithubcopilot, 
  SiNotion 
} from "react-icons/si";
import { 
  MessageSquare, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { PaymentBadges } from "@/components/PaymentBadges";
import { FAQSection } from "@/components/FAQSection";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const AI_TOOLS = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    description: "Access GPT-4, DALL·E 3, and advanced data analysis.",
    price: "৳2,499",
    icon: SiOpenai,
    color: "#10a37f",
    popular: true,
  },
  {
    id: "claude",
    name: "Claude Pro",
    description: "Anthropic's most capable model with 100K context window.",
    price: "৳2,499",
    icon: SiAnthropic,
    color: "#d97706",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Create stunning AI art with the standard or pro plan.",
    price: "৳1,499",
    icon: Sparkles,
    color: "#8b5cf6",
  },
  {
    id: "perplexity",
    name: "Perplexity Pro",
    description: "The ultimate AI search engine with Copilot.",
    price: "৳1,999",
    icon: Zap,
    color: "#20b2aa",
  },
  {
    id: "gemini",
    name: "Gemini Advanced",
    description: "Google's most capable AI model for complex tasks.",
    price: "৳2,199",
    icon: SiGooglegemini,
    color: "#4285f4",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    description: "Your AI pair programmer. Code faster and better.",
    price: "৳1,299",
    icon: SiGithubcopilot,
    color: "#e2e8f0",
  },
  {
    id: "notion",
    name: "Notion AI",
    description: "Write better, think bigger directly in your workspace.",
    price: "৳999",
    icon: SiNotion,
    color: "#ffffff",
  }
];

const WORK_STEPS = [
  {
    title: "Choose Your Plan",
    description: "Select the AI tool and subscription plan that fits your needs.",
    icon: CheckCircle2,
  },
  {
    title: "Contact via WhatsApp",
    description: "Message us directly to confirm availability and get payment details.",
    icon: MessageSquare,
  },
  {
    title: "Get Instant Delivery",
    description: "Make the payment via bKash/Nagad/Rocket and receive your account within 1 hour.",
    icon: Zap,
  }
];

const FAQS = [
  {
    question: "How long does it take to get the account?",
    answer: "Delivery is usually instant, but guaranteed within 1 hour after payment confirmation."
  },
  {
    question: "Is this a shared or private account?",
    answer: "We offer both shared (budget-friendly) and private accounts. You can choose based on your preference."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bKash, Nagad, Rocket, and direct Bank Transfer."
  },
  {
    question: "What if my account stops working?",
    answer: "We provide full warranty for the duration of your subscription. If any issues occur, we will replace or fix the account immediately."
  },
  {
    question: "Can I renew the same account next month?",
    answer: "Yes! You can renew the same account by paying before your subscription expires."
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans selection:bg-teal-500/30">
      {/* Navigation */}
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          isScrolled ? "bg-[#0a0a0a]/80 backdrop-blur-md border-white/10 py-3" : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-teal-gradient flex items-center justify-center glow-teal transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AIPS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#tools" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Tools</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">How it Works</a>
            <a href="#why-us" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Why Us</a>
            <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-all glow-teal hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 py-4 px-4 flex flex-col gap-4 shadow-2xl"
          >
            <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-slate-300 p-2 hover:bg-white/5 rounded-lg">Tools</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-slate-300 p-2 hover:bg-white/5 rounded-lg">How it Works</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-slate-300 p-2 hover:bg-white/5 rounded-lg">Why Us</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-slate-300 p-2 hover:bg-white/5 rounded-lg">FAQ</a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 text-white font-semibold mt-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </a>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection 
          title="The Future is Here. Get Premium AI Today."
          subtitle="Bangladesh's most trusted source for ChatGPT Plus, Claude Pro, Midjourney, and more. Delivered within 1 hour, paid via bKash/Nagad."
          badge="⚡ 10,000+ Happy Customers"
          ctaPrimary={{ label: "View All Tools", href: "#tools" }}
          ctaSecondary={{ label: "Contact via WhatsApp", href: WHATSAPP_LINK }}
          className="pt-32 pb-20 md:pt-48 md:pb-32"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <PaymentBadges label="Secure local payments" className="justify-center" />
          </motion.div>
        </HeroSection>

        {/* Tools Showcase */}
        <section id="tools" className="py-24 relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Premium <span className="text-teal-gradient">AI Subscriptions</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 max-w-2xl mx-auto text-lg"
              >
                Supercharge your workflow with the world's most powerful AI tools. Shared and private accounts available.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {AI_TOOLS.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="card-glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/15 transition-all duration-300"
                >
                  <div 
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: tool.color }}
                  />
                  
                  {tool.popular && (
                    <div className="absolute top-4 right-4 bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#1a1a2e] border border-white/10 shadow-lg"
                    >
                      <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                      <div className="text-sm font-semibold text-teal-400 mt-1">From {tool.price}/mo</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 h-10">
                    {tool.description}
                  </p>
                  
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                  >
                    <span>Buy via WhatsApp</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-[#0a0a0a] relative border-y border-white/5">
          <div className="absolute inset-0 bg-aips-gradient opacity-30 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 max-w-2xl mx-auto text-lg"
              >
                Get your premium AI subscription running in just three simple steps. No credit card required.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent z-0" />
              
              {WORK_STEPS.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1a1a2e] border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-teal-500/50 group-hover:glow-teal transition-all duration-500 relative">
                    <step.icon className="w-7 h-7 text-teal-400" />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-teal-500 text-[#0a0a0a] text-xs font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex justify-center"
            >
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all glow-purple hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start Now via WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Why Us / Trust Section */}
        <section id="why-us" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Why Choose <span className="text-teal-gradient">AIPS?</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-lg mb-10"
              >
                We've built a reputation for reliability, speed, and excellent customer support in Bangladesh.
              </motion.p>
              
              <TrustBadges className="scale-110 mb-12" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card-glass p-8 rounded-2xl border border-white/5 flex gap-5"
              >
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Lightning Fast Delivery</h3>
                  <p className="text-slate-400">No waiting around. 95% of our orders are delivered within 15-30 minutes after payment verification.</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card-glass p-8 rounded-2xl border border-white/5 flex gap-5"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Full Warranty</h3>
                  <p className="text-slate-400">If your account faces any issues during your subscription period, we replace or fix it completely free.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-[#0a0a0a] border-t border-white/5">
          <FAQSection items={FAQS} className="!py-0" />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-gradient flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">AIPS</span>
              </Link>
              <p className="text-slate-400 mb-6 max-w-sm">
                Bangladesh's #1 source for premium AI tool subscriptions. Accessible, affordable, and delivered instantly.
              </p>
              <PaymentBadges label="Accepted" />
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#tools" className="text-slate-400 hover:text-teal-400 transition-colors">AI Tools</a></li>
                <li><a href="#how-it-works" className="text-slate-400 hover:text-teal-400 transition-colors">How it Works</a></li>
                <li><a href="#why-us" className="text-slate-400 hover:text-teal-400 transition-colors">Why Choose Us</a></li>
                <li><a href="#faq" className="text-slate-400 hover:text-teal-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
              <p className="text-slate-400 mb-4">
                Need help or ready to buy? Reach out to us directly.
              </p>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 font-medium transition-colors border border-[#25d366]/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} AI Premium Shop (AIPS). All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
