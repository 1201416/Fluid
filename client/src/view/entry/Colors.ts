export type ColorId = | "Blue" | "Orange";

export type ColorValues = { base: string; dark: string; light: string };

export const ColorOrder: ColorId[] = [
  "Blue",
  "Orange",
];

export const DefaultColor = ColorOrder[0];

export const ColorOptions: { [key in ColorId]: ColorValues } = {
  Blue: { base: "#0078D4", dark: "#99C9EE", light: "#CCE4F6" },
  Orange: { base: "#CA5010", dark: "#EAB99F", light: "#F4DCCF" },
};
