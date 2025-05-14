import React from "react";
import type { SentenceBlock as SentenceBlockType } from "../../types";

interface Props {
  block: SentenceBlockType;
  isEditMode?: boolean;
  onEdit?: (blockId: string, content: unknown) => void;
}

// 간단한 마크다운 파서 (실제 구현에서는 더 완성된 라이브러리 사용 권장)
const parseMarkdown = (text: string): string => {
  if (!text) return "";

  // 굵은 글씨: **text** 또는 __text__
  let formatted = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

  // 기울임 글씨: *text* 또는 _text_
  formatted = formatted.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  // 링크: [text](url)
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // 하이라이트: ==text==
  formatted = formatted.replace(
    /==(.*?)==/g,
    '<span class="highlight">$1</span>'
  );

  return formatted;
};

const SentenceBlock: React.FC<Props> = ({ block, isEditMode, onEdit }) => {
  const { id, content } = block;

  const handleContentChange = (newContent: string) => {
    onEdit?.(id, { content: newContent });
  };

  // 편집 모드일 때는 원본 텍스트 표시, 아닐 때는 마크다운 적용
  const displayContent = isEditMode ? content : parseMarkdown(content);

  return (
    <div
      className="sentence-block"
      data-testid="sentence-block"
      onClick={isEditMode ? () => {} : undefined}
    >
      {isEditMode ? (
        <span>{content}</span>
      ) : (
        <span dangerouslySetInnerHTML={{ __html: displayContent }} />
      )}
    </div>
  );
};

export default SentenceBlock;
