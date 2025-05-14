import React from "react";
import type { Block } from "../types";
import { BlockType } from "../types";
import SentenceBlock from "../components/blocks/SentenceBlock";
import KeywordsBlock from "../components/blocks/KeywordsBlock";
import MultiColumnBlock from "../components/blocks/MultiColumnBlock";
import ParagraphBlock from "../components/blocks/ParagraphBlock";

// 블록 타입에 따라 적절한 컴포넌트를 반환하는 함수
export const renderBlock = (
  block: Block,

  isEditMode?: boolean,

  onEdit?: (blockId: string, content: unknown) => void
) => {
  switch (block.type) {
    case BlockType.SENTENCE:
      return (
        <SentenceBlock
          key={block.id}
          block={block as any}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    case BlockType.KEYWORDS:
      return (
        <KeywordsBlock
          key={block.id}
          block={block as any}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    case BlockType.MULTI_COLUMN:
      return (
        <MultiColumnBlock
          key={block.id}
          block={block as any}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    case BlockType.PARAGRAPH:
      return (
        <ParagraphBlock
          key={block.id}
          block={block as any}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    // 추가적인 블록 타입들을 여기에 구현

    default:
      return <div>지원되지 않는 블록 타입</div>;
  }
};
