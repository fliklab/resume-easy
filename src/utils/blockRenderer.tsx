import React from "react";
import type { Block } from "../types";
import { BlockType } from "../types";

// 실제 구현에서는 각 블록 컴포넌트를 import 해야 합니다
// 임시 컴포넌트
const SentenceBlock: React.FC<{ content: string }> = ({ content }) => (
  <div className="sentence-block">{content}</div>
);

// 블록 타입에 따라 적절한 컴포넌트를 반환하는 함수
export const renderBlock = (
  block: Block,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEditMode?: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEdit?: (blockId: string, content: unknown) => void
) => {
  switch (block.type) {
    case BlockType.SENTENCE:
      // @ts-expect-error - 타입 간소화를 위한 임시 처리
      return <SentenceBlock key={block.id} content={block.content} />;

    // 다른 블록 타입들도 여기에 추가

    default:
      return <div>지원되지 않는 블록 타입</div>;
  }
};
