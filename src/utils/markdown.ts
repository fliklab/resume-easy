/**
 * 간단한 마크다운 텍스트를 HTML로 변환하는 함수
 * 지원: 굵게(**), 기울임(*), 링크([]()), 하이라이트(==)
 */
export const parseMarkdown = (text: string): string => {
  if (!text) return "";

  // Bold: **text** or __text__
  let formatted = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

  // Italic: *text* or _text_
  formatted = formatted.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  // Links: [text](url)
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>'
  );

  // Highlight: ==text==
  formatted = formatted.replace(
    /==(.*?)==/g,
    '<span class="bg-yellow-200">$1</span>'
  );

  return formatted;
};
