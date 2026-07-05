import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
                <GraduationCap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-gray-900">EasyCollege</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Helping TS and AP students make informed decisions about their engineering future.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-green-600" />
              <span>Telangana & Andhra Pradesh, India</span>
            </div>
            <a
              href="mailto:support@easycollage.in"
              className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-green-600"
            >
              <Mail className="w-3.5 h-3.5 text-green-600" />
              <span>support@easycollage.in</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {([
                { label: "Home", href: "/" },
                { label: "TS EAMCET", href: "/ts-eamcet" },
                { label: "AP EAMCET", href: "/ap-eamcet" },
                { label: "Web Options", href: "/ts-eamcet?mode=web-options" },
              ] as const).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Note */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">About</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              EasyCollege is a student tool for exploring EAMCET cutoffs and web options.
              Data is indicative; always verify with the official counselling website before making decisions.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href="/ts-eamcet"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-white"
              >
                TS EAMCET
              </Link>
              <Link
                href="/ap-eamcet"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-white"
              >
                AP EAMCET
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} EasyCollege. Built by{" "}
            <a
              href="https://loynix.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gray-500 hover:text-green-600 transition-colors"
            >
              Loynix Studio - loynix.com
            </a>
            .
          </p>
          <p className="text-xs text-gray-400">Data is for guidance only. Verify with official counselling portals.</p>
        </div>
      </div>
    </footer>
  );
}
