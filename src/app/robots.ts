import type { MetadataRoute } from "next";

const SITE_URL = "https://easycollege.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/rank-finder"],
        disallow: ["/admin", "/admin/login", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
