import React from "react";
import type { MultiColumnBlock as MultiColumnBlockType } from "../../../types";
import { renderBlock } from "../../../utils/blockRenderer";

interface Props {
  block: MultiColumnBlockType;
  isEditMode?: boolean;
  onEdit?: (blockId: string, content: unknown) => void;
}

const MultiColumnBlock: React.FC<Props> = ({ block, isEditMode, onEdit }) => {
  const { columns, ratio = [] } = block;

  // 비율 계산 (기본값은 균등 분할)
  const columnStyles = columns.map((_, index) => {
    const flexValue = ratio[index] || 1;
    return { flex: flexValue };
  });

  return (
    <div
      className="multi-column-block flex gap-4"
      data-testid="multi-column-block"
    >
      {columns.map((columnBlock, index) => (
        <div
          key={`${block.id}-column-${index}`}
          className="column w-full"
          style={columnStyles[index]}
          data-testid={`column-${index}`}
        >
          {renderBlock({ block: columnBlock, isEditMode, onEdit })}
        </div>
      ))}
    </div>
  );
};

export default MultiColumnBlock;
