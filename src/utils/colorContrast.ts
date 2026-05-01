/**
 * Utility functions for calculating color contrast ratios according to WCAG 2.1 standards
 */

/**
 * Convert a hex color to RGB values
 * @param hex - Hex color string (e.g., '#ffffff' or '#fff')
 * @returns RGB values as [r, g, b] where each value is 0-255
 */
export function hexToRgb(hex: string): [number, number, number] {
  // Remove the # if present
  const cleanHex = hex.replace('#', '');

  // Handle 3-digit hex codes
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return [r, g, b];
}

/**
 * Calculate relative luminance of a color according to WCAG formula
 * @param rgb - RGB values as [r, g, b] where each value is 0-255
 * @returns Relative luminance value between 0 and 1
 */
export function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors according to WCAG formula
 * @param color1 - First color as hex string
 * @param color2 - Second color as hex string
 * @returns Contrast ratio between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(hexToRgb(color1));
  const lum2 = getRelativeLuminance(hexToRgb(color2));

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color combination meets WCAG 2.1 Level AA standards
 * @param foreground - Foreground color as hex string
 * @param background - Background color as hex string
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns true if the contrast ratio meets WCAG AA standards
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 3.0 : 4.5;
  return ratio >= requiredRatio;
}
