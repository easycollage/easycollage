import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EasyCollege - TG EAPCET College Predictor",
    short_name: "EasyCollege",
    description:
      "Find Telangana engineering colleges by TG EAPCET rank and shortlist web options.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    categories: ["education"],
  };
}
