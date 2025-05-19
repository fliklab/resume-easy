import React from "react";
import type { Block } from "../types";
import { BlockType } from "../types";
import SentenceBlock from "../components/document/blocks/SentenceBlock";
import KeywordsBlock from "../components/document/blocks/KeywordsBlock";
import MultiColumnBlock from "../components/document/blocks/MultiColumnBlock";
import ParagraphBlock from "../components/document/blocks/ParagraphBlock";

import type { SentenceBlock as SentenceBlockType } from "../types";
import type { KeywordsBlock as KeywordsBlockType } from "../types";
import type { MultiColumnBlock as MultiColumnBlockType } from "../types";
import type { ParagraphBlock as ParagraphBlockType } from "../types";

// 블록 타입에 따라 적절한 컴포넌트를 반환하는 함수
export function renderBlock({
  block,
  isEditMode,
  onEdit,
}: {
  block: Block;
  isEditMode?: boolean;
  onEdit?: (blockId: string, content: unknown) => void;
}): React.ReactNode {
  switch (block.type) {
    case BlockType.SENTENCE:
      return (
        <SentenceBlock
          key={block.id}
          block={block as SentenceBlockType}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    case BlockType.KEYWORDS:
      return (
        <KeywordsBlock
          key={block.id}
          block={block as KeywordsBlockType}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    case BlockType.MULTI_COLUMN:
      return (
        <MultiColumnBlock
          key={block.id}
          block={block as MultiColumnBlockType}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    case BlockType.PARAGRAPH:
      return (
        <ParagraphBlock
          key={block.id}
          block={block as ParagraphBlockType}
          isEditMode={isEditMode}
          onEdit={onEdit}
        />
      );

    default:
      return <div>지원되지 않는 블록 타입</div>;
  }
}
