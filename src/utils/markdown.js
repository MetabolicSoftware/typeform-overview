import snarkdown from "snarkdown";

// Typeform uses a singular * for bold
const typeformBoldMarkdown = /(?<!\\)\*/g;

export default function markdown(markdown) {
  if (!markdown) return "";
  // replace Typeform's singular * for regular markdown's double *
  const fixedBold = markdown.replace(typeformBoldMarkdown, "**");
  return snarkdown(fixedBold);
}
