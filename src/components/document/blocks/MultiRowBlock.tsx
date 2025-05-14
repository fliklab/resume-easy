import React from "react";
import type { MultiRowBlock as MultiRowBlockType } from "../../../types";
import { renderBlock } from "../../../utils/blockRenderer";

interface MultiRowBlockProps {
  block: MultiRowBlockType;
  isEditMode?: boolean;
  onEdit?: (blockId: string, content: unknown) => void;
}

const MultiRowBlock: React.FC<MultiRowBlockProps> = ({
  block,
  isEditMode,
  onEdit,
}) => {
  const { rows } = block;

  return (
    <div className="multi-row-block" data-testid="multi-row-block">
      {rows.map((row, index) => (
        <div
          key={row.id}
          className="multi-row-row"
          data-testid={`multi-row-row-${index}`}
        >
          {renderBlock(row, isEditMode, onEdit)}
        </div>
      ))}
    </div>
  );
};

export default MultiRowBlock;
