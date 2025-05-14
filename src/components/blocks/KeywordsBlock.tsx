import React from "react";
import type { KeywordsBlock as KeywordsBlockType } from "../../types";

interface Props {
  block: KeywordsBlockType;
  isEditMode?: boolean;
  onEdit?: (blockId: string, content: unknown) => void;
}

const KeywordsBlock: React.FC<Props> = ({ block, isEditMode, onEdit }) => {
  const { id, items, title } = block;

  const handleEdit = (newItems: string[]) => {
    onEdit?.(id, { items: newItems });
  };

  return (
    <div className="keywords-block" data-testid="keywords-block">
      {title && (
        <h4 className="keywords-title" data-testid="keywords-title">
          {title}
        </h4>
      )}

      <div className="keywords-container" data-testid="keywords-container">
        {items.map((item, index) => (
          <span
            key={`${id}-keyword-${index}`}
            className="keyword-item"
            data-testid={`keyword-item-${index}`}
            onClick={isEditMode ? () => {} : undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordsBlock;
