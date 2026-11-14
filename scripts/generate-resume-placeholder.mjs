/**
 * Generates the labelled placeholder resume PDF (no dependencies).
 * Run: node scripts/generate-resume-placeholder.mjs
 * Replace public/resume-adarsh-placeholder.pdf with the genuine resume when ready.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "resume-adarsh-placeholder.pdf");

const lines = [
  { text: "DEMO PLACEHOLDER - NOT GENUINE", size: 18, gap: 30 },
  { text: "This file is a stand-in so the download flow works.", size: 11, gap: 18 },
  { text: "Replace public/resume-adarsh-placeholder.pdf with Adarsh's real resume.", size: 11, gap: 34 },
  { text: "ADARSH", size: 26, gap: 26 },
  { text: "Computer Science Engineering (AI & ML) - Third-year undergraduate", size: 12, gap: 18 },
  { text: "Aspiring AI/ML Engineer | AI Agent Developer | Product Builder", size: 12, gap: 30 },
  { text: "PROFILE", size: 13, gap: 18 },
  { text: "I build software, experiment with intelligent systems, explore AI agents,", size: 11, gap: 16 },
  { text: "and turn ideas into practical products.", size: 11, gap: 28 },
  { text: "FOCUS AREAS", size: 13, gap: 18 },
  { text: "- Artificial Intelligence & Machine Learning", size: 11, gap: 16 },
  { text: "- AI agent workflows, tool use, and reliability validation", size: 11, gap: 16 },
  { text: "- Product building (NoteKart - student marketplace)", size: 11, gap: 16 },
  { text: "- Research engineering (paper format conversion evaluation)", size: 11, gap: 28 },
  { text: "TECHNOLOGIES", size: 13, gap: 18 },
  { text: "Python | Java | PHP | Django | Streamlit | MySQL", size: 11, gap: 28 },
  { text: "LINKS", size: 13, gap: 18 },
  { text: "GitHub: github.com/CodeWithAdarsh007", size: 11, gap: 16 },
  { text: "Portfolio: 3-d-portfolio-xi-tan.vercel.app", size: 11, gap: 16 },
  { text: "Email / LinkedIn: pending - see CONTENT_REPLACEMENT_GUIDE.md", size: 11, gap: 30 },
  { text: "All genuine details (education dates, contact info, experience) must be", size: 9, gap: 14 },
  { text: "added by Adarsh before this resume is shared anywhere.", size: 9, gap: 14 },
];

let y = 780;
let stream = "BT\n";
for (const line of lines) {
  stream += `/F1 ${line.size} Tf\n1 0 0 1 56 ${y} Tm\n(${line.text.replace(/[()\\]/g, "\\$&")}) Tj\n`;
  y -= line.gap;
}
stream += "ET";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf, "latin1");
console.log(`wrote ${out} (${pdf.length} bytes)`);