/**
 * Vibrant studio palette helpers. Every accent carries a full family:
 * saturated field colour, readable ink colour, tint, border and wash.
 */
export const accents = {
  blue: {
    bar: "bg-blue",
    tile: "bg-blue/15 text-blue-ink",
    text: "text-blue-ink",
    border: "hover:border-blue",
    dot: "bg-blue",
    solid: "bg-blue",
    field: "var(--blue)",
    ink: "var(--blue-ink)",
  },
  tangerine: {
    bar: "bg-tangerine",
    tile: "bg-tangerine/20 text-tangerine-ink",
    text: "text-tangerine-ink",
    border: "hover:border-tangerine",
    dot: "bg-tangerine",
    solid: "bg-tangerine",
    field: "var(--tangerine)",
    ink: "var(--tangerine-ink)",
  },
  sunshine: {
    bar: "bg-sunshine",
    tile: "bg-sunshine/25 text-sunshine-ink",
    text: "text-sunshine-ink",
    border: "hover:border-sunshine",
    dot: "bg-sunshine",
    solid: "bg-sunshine",
    field: "var(--sunshine)",
    ink: "var(--sunshine-ink)",
  },
  leaf: {
    bar: "bg-leaf",
    tile: "bg-leaf/18 text-leaf-ink",
    text: "text-leaf-ink",
    border: "hover:border-leaf",
    dot: "bg-leaf",
    solid: "bg-leaf",
    field: "var(--leaf)",
    ink: "var(--leaf-ink)",
  },
  lavender: {
    bar: "bg-lavender",
    tile: "bg-lavender/20 text-lavender-ink",
    text: "text-lavender-ink",
    border: "hover:border-lavender",
    dot: "bg-lavender",
    solid: "bg-lavender",
    field: "var(--lavender)",
    ink: "var(--lavender-ink)",
  },
  coral: {
    bar: "bg-coral",
    tile: "bg-coral/18 text-coral-ink",
    text: "text-coral-ink",
    border: "hover:border-coral",
    dot: "bg-coral",
    solid: "bg-coral",
    field: "var(--coral)",
    ink: "var(--coral-ink)",
  },
  turquoise: {
    bar: "bg-turquoise",
    tile: "bg-turquoise/18 text-turquoise-ink",
    text: "text-turquoise-ink",
    border: "hover:border-turquoise",
    dot: "bg-turquoise",
    solid: "bg-turquoise",
    field: "var(--turquoise)",
    ink: "var(--turquoise-ink)",
  },
};

export const getAccent = (name) => accents[name] || accents.blue;
