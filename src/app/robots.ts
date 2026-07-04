import type { MetadataRoute } from "next";

const SITE_URL = "https://www.easycollage.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/rank-finder", "/ts-eamcet", "/ap-eamcet"],
        disallow: ["/admin", "/admin/login", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
