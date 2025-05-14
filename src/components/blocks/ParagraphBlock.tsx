import React from "react";
import type { ParagraphBlock as ParagraphBlockType } from "../../types";

interface Props {
  block: ParagraphBlockType;
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

  // 줄바꿈을 <br>로 변환
  formatted = formatted.replace(/\n/g, "<br />");

  return formatted;
};

const ParagraphBlock: React.FC<Props> = ({ block, isEditMode, onEdit }) => {
  const { id, title, content } = block;

  const handleContentChange = (newContent: string) => {
    onEdit?.(id, { content: newContent });
  };

  const handleTitleChange = (newTitle: string) => {
    onEdit?.(id, { title: newTitle });
  };

  // 편집 모드일 때는 원본 텍스트 표시, 아닐 때는 마크다운 적용
  const displayContent = isEditMode ? content : parseMarkdown(content);

  return (
    <div className="paragraph-block" data-testid="paragraph-block">
      {title && (
        <h4
          className="paragraph-title"
          data-testid="paragraph-title"
          onClick={isEditMode ? () => {} : undefined}
        >
          {title}
        </h4>
      )}

      <div
        className="paragraph-content"
        data-testid="paragraph-content"
        onClick={isEditMode ? () => {} : undefined}
      >
        {isEditMode ? (
          <div>{content}</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: displayContent }} />
        )}
      </div>
    </div>
  );
};

export default ParagraphBlock;
