/** Timeline entries, newest first. Copy lives in messages (experience.items.<key>). */
export const experienceItems = [
  { key: "exadevFullstack", type: "work", monogram: "E", current: true },
  { key: "exadevIntern", type: "internship", monogram: "E", current: false },
  { key: "hypermediaDev", type: "work", monogram: "H", current: false },
  { key: "hypermediaIntern", type: "internship", monogram: "H", current: false },
  { key: "mtc", type: "community", monogram: "M", current: false },
] as const;
