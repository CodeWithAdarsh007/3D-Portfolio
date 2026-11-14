export const accents = {
  blue: {
    bar: "bg-blue",
    tile: "bg-blue/12 text-blue-ink",
    text: "text-blue-ink",
    border: "hover:border-blue/50",
    dot: "bg-blue",
  },
  sage: {
    bar: "bg-sage",
    tile: "bg-sage/15 text-sage-ink",
    text: "text-sage-ink",
    border: "hover:border-sage/60",
    dot: "bg-sage",
  },
  amber: {
    bar: "bg-amber",
    tile: "bg-amber/18 text-amber-ink",
    text: "text-amber-ink",
    border: "hover:border-amber/60",
    dot: "bg-amber",
  },
};

export const getAccent = (name) => accents[name] || accents.blue;