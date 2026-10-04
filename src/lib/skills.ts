/** Skill groups. Titles, descriptions and items live in messages (skills.groups.<key>). */
export const skillGroups = [
  { key: "frontend", icon: "monitor", span: "lg:col-span-3" },
  { key: "backend", icon: "server", span: "lg:col-span-3" },
  { key: "mobile", icon: "smartphone", span: "lg:col-span-2" },
  { key: "data", icon: "database", span: "lg:col-span-2" },
  { key: "ai", icon: "sparkles", span: "lg:col-span-2" },
  { key: "languages", icon: "code", span: "lg:col-span-3" },
  { key: "tools", icon: "git", span: "lg:col-span-3" },
] as const;

export type SkillGroupKey = (typeof skillGroups)[number]["key"];
export type SkillIcon = (typeof skillGroups)[number]["icon"];

/** Core technologies shown in the marquee (proper nouns). */
export const coreStack = [
  "Laravel",
  "React",
  "React Native",
  "FastAPI",
  "PHP",
  "JavaScript",
  "Python",
  "Java",
  "MySQL",
  "REST APIs",
  "Gemini API",
  "CP-SAT",
  "Bootstrap",
  "Git",
  "GitHub",
  "Scrum",
];
