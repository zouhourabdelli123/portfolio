/**
 * Project registry. All copy lives in messages/*.json under
 * `projects.items.<key>`; this file only holds structure and tech names.
 *
 * Screenshots: drop images into /public/images/projects/<slug>/ and set
 * `cover` (and optionally `gallery`) below. While `cover` is undefined the
 * site renders an illustrated placeholder (see components/projects/ProjectVisual).
 */
export const projectSlugs = [
  "omnichannel-task-platform",
  "inventory-management-system",
  "cross-platform-mobile-apps",
  "full-stack-web-applications",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];
export type ProjectKey = "omnichannel" | "inventory" | "mobile" | "webapps";
export type ProjectVisualKind = "platform" | "inventory" | "mobile" | "web";
export type FeatureIcon =
  | "layers"
  | "bot"
  | "trending"
  | "calendar"
  | "network"
  | "workflow"
  | "package"
  | "cart"
  | "chart"
  | "devices"
  | "rocket"
  | "lock"
  | "shield"
  | "database"
  | "monitor"
  | "users";

export type Project = {
  slug: ProjectSlug;
  key: ProjectKey;
  visual: ProjectVisualKind;
  flagship?: boolean;
  /** One icon per feature entry in messages (projects.items.<key>.features), same order. */
  featureIcons: FeatureIcon[];
  /** Proper-noun technology names (not translated). */
  stack: string[];
  cover?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "omnichannel-task-platform",
    key: "omnichannel",
    visual: "platform",
    flagship: true,
    featureIcons: ["layers", "bot", "trending", "calendar", "network", "workflow"],
    stack: [
      "React",
      "React Native",
      "FastAPI",
      "Python",
      "REST APIs",
      "Microservices",
      "Gemini API",
      "CP-SAT",
      "Scrum",
    ],
    // TODO(screenshots): add /public/images/projects/omnichannel-task-platform/cover.jpg
    // then set: cover: "/images/projects/omnichannel-task-platform/cover.jpg",
  },
  {
    slug: "inventory-management-system",
    key: "inventory",
    visual: "inventory",
    featureIcons: ["package", "cart", "chart"],
    stack: ["PHP", "Laravel", "JavaScript", "SQL"],
    // TODO(screenshots): add /public/images/projects/inventory-management-system/cover.jpg
  },
  {
    slug: "cross-platform-mobile-apps",
    key: "mobile",
    visual: "mobile",
    featureIcons: ["devices", "rocket", "lock"],
    stack: ["React Native", "JavaScript", "Android", "iOS", "REST APIs", "Git"],
    // TODO(screenshots): add /public/images/projects/cross-platform-mobile-apps/cover.jpg
  },
  {
    slug: "full-stack-web-applications",
    key: "webapps",
    visual: "web",
    featureIcons: ["shield", "database", "monitor", "users"],
    stack: ["Laravel", "PHP", "React.js", "JavaScript", "MySQL", "Bootstrap", "REST APIs", "Git"],
    // TODO(screenshots): add /public/images/projects/full-stack-web-applications/cover.jpg
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
