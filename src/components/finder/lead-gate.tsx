"use client";

import { useState } from "react";
import { GraduationCap, Phone, User, Hash, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { BRANCHES, CATEGORIES, GENDERS } from "@/lib/mock-data";

interface LeadFormData {
  name: string;
  phone: string;
  rank: string;
  category: string;
  gender: string;
  course: string;
}

interface LeadGateProps {
  onUnlock: (data: LeadFormData) => void;
}

const INPUT_CLS =
  "w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400 transition-shadow";
const NAME_PATTERN = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const MAX_NAME_LENGTH = 70;

export function LeadGate({ onUnlock }: LeadGateProps) {
  const [form, setForm] = useState<LeadFormData>({
    name: "",
    phone: "",
    rank: "",
    category: "",
    gender: "",
    course: "",
  });
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate(): boolean {
    const e: Partial<LeadFormData> = {};

    const name = form.name.trim();
    if (!name || name.length < 2) {
      e.name = "Enter your full name";
    } else if (name.length > MAX_NAME_LENGTH) {
      e.name = "Full name must be 70 characters or less";
    } else if (!NAME_PATTERN.test(name)) {
      e.name = "Full name can contain only letters and spaces";
    }

    const phone = form.phone.replace(/\s/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      e.phone = "Enter a valid 10-digit Indian mobile number";
    }

    const rank = parseInt(form.rank, 10);
    if (!form.rank || isNaN(rank) || rank < 1 || rank > 200000) {
      e.rank = "Enter a valid rank between 1 and 2,00,000";
    }

    if (!form.category) {
      e.category = "Select your category";
    }

    if (!form.gender) {
      e.gender = "Select your gender";
    }

    if (!form.course) {
      e.course = "Select your course";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.replace(/\s/g, ""),
          rank: parseInt(form.rank, 10),
          category: form.category,
          gender: form.gender,
          course: form.course,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit");
      }

      onUnlock(form);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-50 via-white to-emerald-50/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-[calc(100vh-2rem)] overflow-y-auto">
          {/* Top strip */}
          <div className="bg-green-600 px-6 py-5 text-white">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">EasyCollege</span>
            </div>
            <h2 className="font-display font-bold text-xl leading-snug">
              Find colleges that match your rank
            </h2>
            <p className="text-green-100 text-sm mt-1">
              Quick details to get your personalised results
            </p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Ravi Kumar"
                  value={form.name}
                  maxLength={MAX_NAME_LENGTH}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    if (errors.name) setErrors((er) => ({ ...er, name: "" }));
                  }}
                  className={INPUT_CLS}
                  autoFocus
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm((f) => ({ ...f, phone: val }));
                    if (errors.phone) setErrors((er) => ({ ...er, phone: "" }));
                  }}
                  className={INPUT_CLS}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Rank */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                EAMCET Rank <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="e.g. 12000"
                  value={form.rank}
                  min={1}
                  max={200000}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, rank: e.target.value }));
                    if (errors.rank) setErrors((er) => ({ ...er, rank: "" }));
                  }}
                  className={`${INPUT_CLS} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </div>
              {errors.rank && <p className="text-xs text-red-500 mt-1">{errors.rank}</p>}
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Course <span className="text-red-500">*</span>
              </label>
              <select
                value={form.course}
                onChange={(e) => {
                  setForm((f) => ({ ...f, course: e.target.value }));
                  if (errors.course) setErrors((er) => ({ ...er, course: "" }));
                }}
                className={INPUT_CLS + " [appearance:none]"}
              >
                <option value="" disabled>Select course</option>
                {BRANCHES.map((branch) => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
              {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
            </div>

            {/* Category and Gender Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, category: e.target.value }));
                    if (errors.category) setErrors((er) => ({ ...er, category: "" }));
                  }}
                  className={INPUT_CLS + " [appearance:none]"}
                >
                  <option value="" disabled>Select</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.replace("_", "-")}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.gender}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, gender: e.target.value }));
                    if (errors.gender) setErrors((er) => ({ ...er, gender: "" }));
                  }}
                  className={INPUT_CLS + " [appearance:none]"}
                >
                  <option value="" disabled>Select</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
              </div>
            </div>

            {submitError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  View My Colleges
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trust */}
            <div className="flex items-center justify-center gap-4 pt-1">
              {["Free to use", "No spam", "Instant results"].map((t) => (
                <div key={t} className="flex items-center gap-1 text-xs text-gray-400">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Your information is kept private and used only to improve results.
        </p>
      </div>
    </div>
  );
}
