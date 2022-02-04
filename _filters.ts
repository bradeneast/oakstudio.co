// @ts-nocheck
import hexToRGB from "https://jspm.dev/hex-rgb";
import ColorContrastChecker from "https://jspm.dev/color-contrast-checker";

export function splitting(text: string) {

  let lines = text.split(/\n|\r/);
  let charCount = 0;

  function charTemplate(char: string, i: number) {
    charCount++;
    return `<span class="char" style="--char-index:${charCount}">${char}</span>`;
  }

  function wordTemplate(word: string, i: number) {
    return `<span class="word" style="--word-index:${i}">${word.split("").map(charTemplate).join("")}</span>`;
  }

  function lineTemplate(line: string, i: number) {
    return line.split(" ").map(wordTemplate).join(`<span class="whitespace"> </span>`);
  }

  return lines.map(lineTemplate).join("\n");
}

function average(nums) {
  let total = 0;
  nums = nums.filter(n => n > 0);
  nums.map(n => total += n);
  return Math.round(total / nums.length);
}

function bwContrast(value: string) {
  let nums = hexToRGB(value, { format: "array" });
  let alpha = nums.length > 3 ? nums[3] : 1;
  let avg = average(nums.slice(0, 3));
  return avg < 150 * alpha ? "FFF" : "000";
}

/** Takes two colors and checks them against WCAG contrast standards. Will return `FFF` or `000` if `targetHex` fails the test. */
export function bestContrast(referenceHex: string, targetHex: string) {
  const ccc = new ColorContrastChecker();
  const passes = ccc.isLevelAAA("#" + referenceHex, "#" + targetHex, 14);
  if (passes)
    return targetHex;
  if (!passes)
    return bwContrast(referenceHex);
}