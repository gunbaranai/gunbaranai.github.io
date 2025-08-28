import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tintSvg (svg: string, hex: string) {
	return svg.includes("currentColor")
		? svg.replace(/currentColor/g, hex)
		: svg.replace("<svg", `<svg fill="${hex}"`);
};