// @ts-nocheck
import hexToRGB from "https://jspm.dev/hex-rgb";

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

export function bestContrastRGB(value: string) {
  let nums = hexToRGB(value, { format: "array" });
  let alpha = nums.length > 3 ? nums[3] : 1;
  let avg = average(nums.slice(0, 3));
  return avg < 150 * alpha ? "white" : "black";
}