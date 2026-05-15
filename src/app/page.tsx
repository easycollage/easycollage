"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  MapPin,
  Globe,
  GitBranch,
  Smartphone,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  CalendarDays,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroLeadForm } from "@/components/finder/hero-lead-form";
import { AnimatedStats } from "@/components/landing/animated-stats";
import { Reveal } from "@/components/landing/reveal";

const COUNSELLING_YEAR = new Date().getFullYear();
const HERO_BADGE_LABEL = `TS EAMCET ${COUNSELLING_YEAR} Counselling Tool`;
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const COUNSELLING_MESSAGE = encodeURIComponent(
  "Hi EasyCollege, I am confused about TS EAMCET web options. Please guide me."
);
const COUNSELLING_WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${COUNSELLING_MESSAGE}`
  : `https://wa.me/?text=${COUNSELLING_MESSAGE}`;

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Rank Filtering",
    description:
      "Enter your EAMCET rank and get a filtered list of eligible colleges in milliseconds. No more manual lookups.",
    accent: "from-emerald-400/20 to-green-500/5",
  },
  {
    icon: MapPin,
    title: "Telangana-Specific Data",
    description:
      "Built exclusively for TS EAMCET. Data covers colleges across Hyderabad, Warangal, Nizamabad and all districts.",
    accent: "from-sky-400/15 to-blue-500/5",
  },
  {
    icon: Globe,
    title: "Web Options Support",
    description:
      "Clearly see which colleges are available in web counselling rounds. Plan your web options intelligently.",
    accent: "from-violet-400/15 to-purple-500/5",
  },
  {
    icon: GitBranch,
    title: "Branch Comparison",
    description:
      "Compare CSE, ECE, MECH, IT and more across multiple colleges side by side with cutoff ranges.",
    accent: "from-amber-400/15 to-yellow-500/5",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly",
    description:
      "Search and explore from your phone during counselling. Designed mobile-first from the ground up.",
    accent: "from-rose-400/15 to-pink-500/5",
  },
  {
    icon: BarChart3,
    title: "Cutoff Insights",
    description:
      "See exact cutoff rank ranges per category — OC, BC-A/B/C/D/E, SC, ST. Make data-driven decisions.",
    accent: "from-teal-400/20 to-emerald-500/5",
  },
];

const STATS = [
  { value: "300+", label: "Colleges" },
  { value: "10+", label: "Branches" },
  { value: "8", label: "Categories" },
  { value: "1-click", label: "Results" },
];

const COURSE_GROUPS = [
  {
    title: "Engineering Category (E)",
    stream: "MPC Stream",
    courses: [
      "B.E. / B.Tech.",
      "B.Tech. (Agricultural Engineering)",
      "B.Tech. (Bio-Technology) (M.P.C.)",
      "B.Tech. (Dairy Technology)",
      "B.Tech. (Food Technology)",
      "B.Tech. (Biomedical Engineering) (M.P.C.)",
      "B.Tech. (Pharmaceutical Engineering) (M.P.C.)",
      "B.Pharmacy (M.P.C.)",
      "Pharm-D (M.P.C.)",
    ],
  },
  {
    title: "Agriculture & Pharmacy Category (A&P)",
    stream: "BiPC Stream",
    courses: [
      "B.Sc. (Hons.) Agriculture",
      "B.Sc. (Hons.) Horticulture",
      "B.Sc. (Forestry)",
      "B.V.Sc. & Animal Husbandry",
      "B.F.Sc. (Bachelor of Fisheries Sciences)",
      "B.Sc. (Nursing)",
      "B.Tech. (Food Technology)",
      "B.Tech. (Bio-Technology) (Bi.P.C.)",
      "B.Tech. (Biomedical Engineering) (Bi.P.C.)",
      "B.Tech. (Pharmaceutical Engineering) (Bi.P.C.)",
      "B.Pharmacy (Bi.P.C.)",
      "Pharm-D (Bi.P.C.)",
    ],
  },
];

const COMPARISON_OTHERS = [
  "Long lists with too many colleges to compare",
  "Students may miss better choices for their rank",
  "Cutoffs, branches, and categories are hard to read quickly",
  "Planning order becomes confusing during counselling",
];

const COMPARISON_OURS = [
  "Shows colleges based on your rank and category",
  "Helps shortlist safer and better web options",
  "Makes branch and college comparison easier",
  "Built to reduce mistakes before final submission",
];

const PEOPLE = [
  {
    name: "Panthangi Sandeep",
    role: "Founder",
    image: "/assets/Founder.jpeg",
    featured: true,
  },
  {
    name: "Bothapalli Naresh",
    role: "Team Member",
    image: "/assets/BothapalliNaresh.jpg",
  },
  {
    name: "Nagireddy Abhiram",
    role: "Team Member",
    image: "/assets/Nagireddy-Abhiram.jpeg",
  },
  {
    name: "Thalari Bhanu",
    role: "Team Member",
    image: "/assets/ThalariBhanu.jpeg",
  },
  {
    name: "Chimmula Manojkumar",
    role: "Team Member",
    image: "/assets/Chimmula-Manojkumar.jpeg",
  },
];

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-green-700">
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f9f6] font-sans text-gray-900 antialiased selection:bg-green-200 selection:text-green-900">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO — asymmetric dark/light split
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-green-50 via-white to-[#eef6ec] pt-20">
        {/* Dark left panel */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.25))]" />
        {/* Light right panel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] bg-white/45 lg:block" />

        {/* Glow */}
        <div className="pointer-events-none absolute left-[26%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/20 blur-[140px]" />

        {/* Dot grid on dark side */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-[0.14] lg:w-[52%]"
          style={{
            backgroundImage: "radial-gradient(circle, #16a34a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid min-h-[80vh] grid-cols-1 items-center gap-0 lg:grid-cols-2">
            {/* LEFT — dark, headline */}
            <div className="py-16 lg:py-0 lg:pr-16">
              <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 shadow-sm shadow-green-900/5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="text-xs font-semibold tracking-wide text-green-700">
                  {HERO_BADGE_LABEL}
                </span>
              </div>

              <h1 className="animate-fade-up delay-100 mb-6">
                <span className="block font-display text-5xl font-extrabold leading-[1.0] tracking-[-0.04em] text-gray-950 sm:text-6xl xl:text-[4rem]">
                  Your rank.
                </span>
                <span className="relative mt-1 block w-fit font-display text-5xl font-extrabold leading-[1.0] tracking-[-0.04em] text-gray-950 sm:text-6xl xl:text-[4rem]">
                  Your college.
                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-green-500"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-5 block font-display text-2xl font-light leading-[1.1] tracking-[-0.02em] text-gray-500 sm:text-3xl xl:text-[2rem]">
                  your EAMCET rank
                </span>
              </h1>

              <p className="animate-fade-up delay-200 mb-10 max-w-md text-base leading-relaxed text-gray-600">
                Discover eligible colleges, branches, and web options instantly.
                No confusion. No guesswork. Just clarity.
              </p>

              <div className="animate-fade-up delay-300 mb-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/rank-finder"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-400"
                >
                  College Prediction
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/rank-finder?mode=web-options"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-green-200 bg-white px-7 py-4 text-sm font-bold text-gray-700 shadow-lg shadow-green-900/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50"
                >
                  Web Options
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="animate-fade-up delay-400 flex flex-wrap gap-5">
                {["Free to use", "No signup required", "Updated cutoffs"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-medium text-gray-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — light, form */}
            <div className="pb-16 lg:py-0 lg:pl-12 xl:pl-16">
              <HeroLeadForm />
            </div>
          </div>
        </div>

        {/* Stats bottom bar */}
        <div className="relative z-20 w-full border-t border-green-100 bg-white/70 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <AnimatedStats stats={STATS} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — bento grid
      ════════════════════════════════════════════ */}
      <section id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionPill>
                  <Sparkles className="h-3 w-3" /> Why EasyCollege
                </SectionPill>
                <h2 className="font-display mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.025em] text-gray-950 sm:text-4xl xl:text-5xl">
                  Everything you need
                  <br className="hidden sm:block" />
                  <span className="text-green-600"> for counselling</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-gray-500 lg:text-right">
                We built the tool we wish we had during EAMCET counselling. Simple, accurate, fast.
              </p>
            </div>
          </Reveal>

          <div className="grid auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={i * 60}>
                  <div
                    className={`group relative h-full overflow-hidden rounded-3xl border border-gray-100/80 bg-gradient-to-br ${feature.accent} bg-[#f8faf7] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-900/[0.07]`}
                  >
                    <div
                      className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]"
                      style={{
                        backgroundImage: "radial-gradient(circle, #16a34a 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="relative">
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md shadow-gray-200/80 ring-1 ring-gray-100 transition-all duration-300 group-hover:ring-green-100 group-hover:shadow-green-100">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-display mb-2.5 text-lg font-bold text-gray-950">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPARISON — dark section
      ════════════════════════════════════════════ */}
      <section className="bg-[#f8f9f6] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-14 text-center">
            <SectionPill>
              <GraduationCap className="h-3 w-3" /> TG EAPCET 2026
            </SectionPill>
            <h2 className="font-display mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.025em] text-gray-950 sm:text-4xl xl:text-5xl">
              Courses Offered
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
              Explore the courses available through TG EAPCET 2026 for MPC and BiPC streams.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {COURSE_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-950/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-2xl hover:shadow-green-900/[0.06] sm:p-8">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-950">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-green-600">
                        {group.stream}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {group.courses.map((course) => (
                      <div
                        key={course}
                        className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 px-3.5 py-3 text-sm text-gray-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-16 text-center">
            <SectionPill>Why It Matters</SectionPill>
            <h2 className="font-display mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl xl:text-5xl">
              Comparing ours
              <span className="text-green-400"> with others</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/40">
              Web options decide the final allotment. A small mistake in choice order
              or cutoff understanding can change everything.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {/* Others */}
            <Reveal delay={0}>
              <div className="h-full rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <span className="text-sm font-bold text-white/30">✕</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white/40">
                    Normal web options lists
                  </h3>
                </div>
                <ul className="space-y-4">
                  {COMPARISON_OTHERS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-white/30">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Ours */}
            <Reveal delay={120}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-950/80 to-gray-950 p-8 shadow-2xl shadow-green-500/10">
                <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 ring-1 ring-green-400/30">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">EasyCollege</h3>
                  <span className="ml-auto rounded-full border border-green-400/20 bg-green-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
                    Recommended
                  </span>
                </div>
                <ul className="space-y-4">
                  {COMPARISON_OURS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PEOPLE — mosaic grid
      ════════════════════════════════════════════ */}
      <section className="bg-[#f8f9f6] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionPill>Our Team</SectionPill>
                <h2 className="font-display mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.025em] text-gray-950 sm:text-4xl xl:text-5xl">
                  People behind
                  <span className="text-green-600"> EasyCollege</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-gray-500 lg:text-right">
                Meet the team shaping a simpler, clearer college search for every Telangana student.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {PEOPLE.map((person, i) => (
              <Reveal
                key={person.name}
                delay={i * 80}
                className={
                  person.featured
                    ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-2"
                    : ""
                }
              >
                <div className="group relative h-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gray-900/12">
                  <div
                    className={`relative w-full overflow-hidden ${
                      person.featured ? "aspect-[1/1.1] lg:aspect-[1/1.2]" : "aspect-[3/4]"
                    }`}
                  >
                    <img
                      src={person.image}
                      alt={`${person.name}, ${person.role}`}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p
                        className={`font-display font-bold leading-tight text-white ${
                          person.featured ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                        }`}
                      >
                        {person.name}
                      </p>
                      <p
                        className={`mt-0.5 font-medium text-green-300 ${
                          person.featured ? "text-xs sm:text-sm" : "text-xs"
                        }`}
                      >
                        {person.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COUNSELLING HELP — dark card
      ════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-1 shadow-2xl shadow-gray-950/20">
              <div className="pointer-events-none absolute -top-px left-16 right-16 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-gray-900 to-gray-950 px-8 py-10 sm:px-12 sm:py-12">
                <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />
                <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                  <div className="max-w-lg">
                    <SectionPill>Personal Guidance</SectionPill>
                    <h2 className="font-display mt-4 text-2xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-3xl xl:text-4xl">
                      Confused about
                      <br />
                      <span className="text-green-400">web options?</span>
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/45">
                      Book a quick counselling call or message us on WhatsApp for
                      guidance before final submission.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row xl:shrink-0">
                    <button
                      type="button"
                      data-cal-link="easy-collage/10min"
                      data-cal-namespace="10min"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/8 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12"
                    >
                      <CalendarDays className="h-4 w-4" />
                      Book a Meet
                    </button>
                    <a
                      href={COUNSELLING_WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-green-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-400"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — full-bleed green
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-green-600 py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -left-20 -top-40 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-green-800/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" /> Get Started Free
            </span>
            <h2 className="font-display mb-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl xl:text-6xl">
              Ready to find
              <br />
              your college?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60">
              Enter your rank and get an instant list of colleges you're eligible for
              across Telangana.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/rank-finder"
                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-green-700 shadow-2xl shadow-green-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-green-900/40"
              >
                College Prediction
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/rank-finder?mode=web-options"
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-green-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                Web Options
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
