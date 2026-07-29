# 🎬 HIGGSFIELD RENDER BRIEFS — AI Premium Shop

**Project:** AI Premium Shop (aipremiumshop.com)  
**Operator:** Higgsfield  
**Priority:** 3 visual assets needed for Higgsfield-grade website  
**Brand:** Dark + cinematic + premium (higgsfield.ai reference level)

---

## BRIEF #1: HERO HOME VIDEO 🎥 [URGENT — Blocks Homepage Polish]

### Purpose & Placement
Cinematic landing page hero loop — autoplaying, muted, looping background video for `/src/app/page.tsx` hero section. Sets the tone for the entire AIPS brand experience.

### Specifications
- **Target File Path:** `/public/media/hero/aips-hero-home-loop-1920x1080.webm`
- **Aspect Ratio:** 16:9 (1920×1080px)
- **Duration:** 8-12 seconds
- **FPS:** 30fps (smooth)
- **Format:** WebM (H.264/AV1) or MP4 with AAC audio
- **Audio:** MUTED on autoplay (background ambience optional)

### Style & Motion Direction
- **Overall Aesthetic:** Higgsfield-grade cinematic dark + premium
- **Primary Colors:** Deep near-black base (#0A0A0F), neon accent gradients (cyan, gold, magenta)
- **Motion Direction:** Volumetric lighting sweep LEFT → RIGHT with subtle particle drift
- **Secondary Motion:** Slow-moving background plane rotation + depth shift for parallax feel
- **Effects:** Light rays/crepuscular rays, soft glow halos, minimal but impactful color grading

### Content & Brand Safety
- **Subject:** Abstract tech/AI themes (neural network nodes, flowing data, quantum-inspired geometry)
- **NO Third-Party Logos:** Use ONLY AIPS brand identity
- **Color Palette:** Derive from design tokens:
  - Primary accent: #f4b942 (gold/amber — key highlight)
  - Secondary: #20b2aa (teal) or cyan gradient
  - Base: #0A0A0F to #1a1d2e (deep dark blue-black)
  - Glow: Neon cyan or magenta bursts for sci-fi vibe

### Code Fallback
Until video renders, display CSS gradient + scroll-reveal effect:
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 opacity-70 animate-pulse" />
```

### Delivery & Integration
- Deliver as: WebM or MP4 (codec negotiable for browser support)
- Fallback poster: Static frame 0 of video (png, 1920×1080, optimized)
- Next step: Integrate into homepage with `<video autoplay muted loop/>` tag

---

## BRIEF #2: PRODUCT CATEGORY ICONS 🎨 [HIGH — Blocks Category Polish]

### Purpose & Placement
8 category SVG icons used throughout the site:
- Category pages (/category/[slug])
- Product cards in catalog (/products)
- Filter UI in product search
- Guide pages (/guides/[persona])

### Specifications
- **Target File Paths:**
  - `/public/media/icons/aips-icon-chat.svg`
  - `/public/media/icons/aips-icon-image.svg`
  - `/public/media/icons/aips-icon-video.svg`
  - `/public/media/icons/aips-icon-code.svg`
  - `/public/media/icons/aips-icon-workspace.svg`
  - `/public/media/icons/aips-icon-search.svg`
  - `/public/media/icons/aips-icon-voice.svg`
  - `/public/media/icons/aips-icon-agents.svg`

- **Base Size:** 64×64px (scalable SVG — no rasterization)
- **Format:** SVG with inline CSS or gradients

### Category-Specific Design

| Category | Icon Concept | Accent Gradient | Vibes |
|----------|--------------|-----------------|-------|
| **Chat & Assistants** | Chat bubble + AI wave | Cyan → Blue (#0EA5E9 → #0284C7) | Conversational, flowing |
| **Image & Design** | Palette + sparkles or geometric shapes | Magenta → Purple (#EC4899 → #9333EA) | Creative, vibrant |
| **Video & Audio** | Film reel + sound waves | Orange → Red (#F97316 → #EF4444) | Dynamic, energetic |
| **Developer Tools** | Code brackets `{ }` or terminal | Green → Emerald (#10B981 → #059669) | Technical, precise |
| **Workspace** | Document + grid or layers | Amber → Gold (#F59E0B → #FBBF24) | Organized, structured |
| **Search & Research** | Magnifying glass + data nodes | Teal → Cyan (#14B8A6 → #06B6D4) | Discovery, knowledge |
| **Voice & Music** | Waveform or musical note | Purple → Indigo (#A78BFA → #818CF8) | Audio, creative |
| **AI Agents** | Robot/circuit + nodes | Lime → Green (#CDDC39 → #4ADE80) | Intelligence, automated |

### Style Requirements
- **Shape Language:** Bold geometric forms (circles, squares, lines) with smooth curves
- **Stroke Weight:** 2-3px for visibility at 64×64
- **Gradient:** Full-bleed color gradient across icon (not just accent)
- **Consistency:** All 8 icons same line-weight, same visual weight, similar artistic language
- **Highlight:** Optional subtle glow/drop-shadow in SVG for depth

### Code Fallback
Until icons render, use Lucide React icons as placeholders:
```tsx
import { MessageSquare, Palette, Video, Code, Grid, Search, Music, Zap } from 'lucide-react';
<MessageSquare className="w-8 h-8 text-cyan-400" />
```

### Delivery & Integration
- Deliver as: SVG files (one per category, named as above)
- Next step: Import into category pages + product cards

---

## BRIEF #3: SOLUTION PAGE HERO IMAGES 🖼️ [HIGH — Blocks Persona Marketing]

### Purpose & Placement
5 persona-specific hero images for solution pages:
- `/src/app/best-ai-for-students/page.tsx` → Hero section
- `/src/app/best-ai-for-freelancers/page.tsx` → Hero section
- `/src/app/best-ai-for-creators/page.tsx` → Hero section
- `/src/app/best-ai-for-business/page.tsx` → Hero section
- `/src/app/best-ai-for-developers/page.tsx` → Hero section

Each image displays as a full-width hero behind the headline + CTA.

### Specifications
- **Target File Paths:**
  - `/public/media/solutions/aips-solution-students-hero-1920x1080.png`
  - `/public/media/solutions/aips-solution-freelancers-hero-1920x1080.png`
  - `/public/media/solutions/aips-solution-creators-hero-1920x1080.png`
  - `/public/media/solutions/aips-solution-business-hero-1920x1080.png`
  - `/public/media/solutions/aips-solution-developers-hero-1920x1080.png`

- **Aspect Ratio:** 16:9 (1920×1080px each)
- **Format:** PNG (RGB, optimized for web, max 500–800KB per file)
- **Color Depth:** 8-bit PNG (modern browsers support all)

### Persona-Specific Design Briefs

#### **1. STUDENTS Hero**
- **Scene:** Student sitting at desk, laptop glowing, surrounded by books/papers
- **Activity:** Typing, taking notes, looking focused/inspired
- **Mood:** Hopeful, energetic, youthful
- **Color Tone:** Cool tones (blues, purples, silvers) with warm desk lamp accent
- **Lighting:** Desk lamp glow, moonlight through window (nighttime study session)
- **AI Elements:** Subtle holographic text overlay or floating AI suggestions (faint)
- **Brand Color Integration:** #f4b942 (gold accent lamp or highlights)

#### **2. FREELANCERS Hero**
- **Scene:** Freelancer at café or co-working space, laptop + phone, coffee cup
- **Activity:** Typing proposal, checking messages, confident expression
- **Mood:** Professional, productive, independent
- **Color Tone:** Warm, neutral (café browns, warm grays) with cool laptop glow
- **Lighting:** Natural café ambience, laptop screen glow, soft window light
- **AI Elements:** Floating chart/analytics or AI writing suggestion (subtle)
- **Brand Color Integration:** #f4b942 (coffee cup or phone highlight)

#### **3. CREATORS Hero**
- **Scene:** Creator in home studio/workspace: camera rig, ring light, colorful backdrop
- **Activity:** Recording video, adjusting lighting, checking monitor
- **Mood:** Creative, vibrant, energetic, fun
- **Color Tone:** Bright, saturated colors (neon pinks, cyans, purples) — creative energy
- **Lighting:** Ring light + backlighting + RGB ambient lights
- **AI Elements:** Floating text overlay (subtitles, AI-generated caption preview)
- **Brand Color Integration:** #f4b942 (part of the creative lighting setup)

#### **4. BUSINESS OWNERS Hero**
- **Scene:** Business owner in modern office, looking at dashboard/laptop, organized desk
- **Activity:** Reviewing analytics, video call, strategic planning
- **Mood:** Professional, confident, in-control, mature
- **Color Tone:** Professional (grays, navy, white) with subtle corporate branding
- **Lighting:** Modern office lighting, monitor glow, professional ambience
- **AI Elements:** Floating dashboard/chart (AI-powered insights)
- **Brand Color Integration:** #f4b942 (accent in office décor or chart highlights)

#### **5. DEVELOPERS Hero**
- **Scene:** Developer at desk with multiple monitors, code visible on screen
- **Activity:** Coding, debugging, AI co-pilot suggestion visible on screen
- **Mood:** Focused, technical, productive, flow state
- **Color Tone:** Dark tech aesthetic (dark blues, blacks, code greens/cyans)
- **Lighting:** Monitor glow dominates, minimal ambient, high-tech feel
- **AI Elements:** AI code completion popup, floating GitHub/repo icons, terminal window
- **Brand Color Integration:** #f4b942 (accent in IDE theme or highlight colors)

### General Style Requirements (All 5)
- **Aesthetic:** Cinematic, professional photography or high-quality rendering
- **Aspect Ratio:** Keep subject centered and readable at 16:9 (not awkward crop)
- **Brand Safety:** NO third-party logos; use generic tech/office props or AIPS branding
- **Color Grading:** Match Higgsfield dark + neon accent vibe (but lighter than hero video)
- **Depth:** Ensure subject is in sharp focus; background slightly blurred (cinematic depth)
- **Diversity:** Reflect Bangladesh diversity in people/settings (if using real people)

### Code Fallback
Until images render, display solid color gradient + persona emoji:
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-slate-900" />
<p className="absolute inset-0 flex items-center justify-center text-6xl">📚</p>
```

### Delivery & Integration
- Deliver as: 5 PNG files (named as above, optimized for web)
- Next step: Integrate into solution pages as full-width hero background

---

## SUBMISSION STATUS

| Brief | Priority | Status | Next Action |
|-------|----------|--------|-------------|
| **#1: Hero Video** | 🔴 URGENT | 📋 Ready to submit | Submit + wait for render (3-5 hrs est) |
| **#2: Category Icons** | 🟡 HIGH | 📋 Ready to submit | Submit + wait for render (1-2 hrs est) |
| **#3: Solution Heroes** | 🟡 HIGH | 📋 Ready to submit | Submit + wait for render (2-3 hrs est) |

---

## SUBMISSION INSTRUCTIONS FOR HUMAN

1. Copy these 3 briefs
2. Go to Higgsfield operator interface
3. Paste each brief separately (or as batch)
4. Request priority: Hero Video first (blocks homepage)
5. Follow up: Icons + Solution Heroes can render in parallel
6. Expected turnaround: 6-8 hours total

Once files arrive:
- Place in `/public/media/` according to path specifications
- Run `pnpm build` to verify integration
- Push to GitHub + merge to feature branch
- Vercel auto-deploys preview with visuals

---

**Prepared:** 2026-07-29  
**By:** Claude CEO + Lead Front-End Engineer  
**Status:** 3 briefs queued, awaiting Higgsfield render capacity
