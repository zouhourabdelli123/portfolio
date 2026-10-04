/** In-page section ids, in order. Labels come from messages (nav.<id>). */
export const navSections = ["about", "skills", "experience", "projects", "education", "contact"] as const;
export type NavSection = (typeof navSections)[number];
