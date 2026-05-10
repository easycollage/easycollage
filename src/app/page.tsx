import Link from "next/link";
import {
  ArrowRight,
  Zap,
  MapPin,
  Globe,
  GitBranch,
  Smartphone,
  BarChart3,
  ChevronRight,
  GraduationCap,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
//fdf
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Rank Filtering",
    description:
      "Enter your EAMCET rank and get a filtered list of eligible colleges in milliseconds. No more manual lookups.",
  },
  {
    icon: MapPin,
    title: "Telangana-Specific Data",
    description:
      "Built exclusively for TS EAMCET. Data covers colleges across Hyderabad, Warangal, Nizamabad and all districts.",
  },
  {
    icon: Globe,
    title: "Web Options Support",
    description:
      "Clearly see which colleges are available in web counselling rounds. Plan your web options intelligently.",
  },
  {
    icon: GitBranch,
    title: "Branch Comparison",
    description:
      "Compare CSE, ECE, MECH, IT and more across multiple colleges side by side with cutoff ranges.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly",
    description:
      "Search and explore from your phone during counselling. Designed mobile-first from the ground up.",
  },
  {
    icon: BarChart3,
    title: "Cutoff Insights",
    description:
      "See exact cutoff rank ranges per category — OC, BC-A/B/C/D/E, SC, ST. Make data-driven decisions.",
  },
];

const STATS = [
  { value: "300+", label: "Colleges" },
  { value: "10+", label: "Branches" },
  { value: "8", label: "Categories" },
  { value: "3", label: "Regions" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-6 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                TS EAMCET 2024 Counselling Tool
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 leading-[1.1] tracking-tight mb-5 animate-fade-up delay-100">
                Find Telangana Colleges Based on Your{" "}
                <span className="text-green-600">EAMCET Rank</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg animate-fade-up delay-200">
                Discover eligible colleges, branches, and web options instantly
                based on your EAMCET rank. No confusion. No guesswork. Just
                clarity.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
                <Link
                  href="/rank-finder"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 active:bg-green-800 transition-colors text-sm"
                >
                  Check Colleges
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-400">
                {["Free to use", "No signup required", "Updated cutoffs"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-sm text-gray-500"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right: UI preview card */}
            <div className="relative animate-fade-up delay-200">
              <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl p-6 space-y-4">
                {/* Mock search UI */}
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  <span className="font-display font-semibold text-gray-900">College Finder</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">Your EAMCET Rank</div>
                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-green-700 font-mono">
                      12,000
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1 font-medium">Category</div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">OC</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 font-medium">Branch</div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">CSE</div>
                    </div>
                  </div>
                </div>

                {/* Mock results */}
                <div className="space-y-2 pt-1">
                  {[
                    { name: "MGIT, Hyderabad", rank: "5K – 18K", type: "Private" },
                    { name: "Vasavi College of Engineering", rank: "3K – 12K", type: "Private" },
                    { name: "KUCE, Warangal", rank: "2K – 20K", type: "Govt" },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-default"
                    >
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{c.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{c.rank}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        c.type === "Govt"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {c.type}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                  <Search className="w-3.5 h-3.5" />
                  8 eligible colleges found
                </div>
              </div>

              {/* Decorative dot */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-emerald-400 rounded-full opacity-30 blur-xl" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t border-gray-100">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-3xl text-green-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-4">
              Why EasyCollege
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Everything you need for counselling
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We've built the tool we wish we had during EAMCET counselling. Simple, accurate, and fast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white border border-gray-100 rounded-xl p-6 hover:border-green-200 hover:shadow-md transition-all duration-200"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-green-600 rounded-2xl px-8 py-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-700 pointer-events-none" />
            <div className="relative">
              <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
                Ready to find your college?
              </h2>
              <p className="text-green-100 mb-7 max-w-md mx-auto text-sm leading-relaxed">
                Enter your rank and get an instant list of colleges you're eligible for across Telangana.
              </p>
              <Link
                href="/rank-finder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors text-sm"
              >
                Find My Colleges
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
