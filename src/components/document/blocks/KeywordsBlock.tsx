import React from "react";
import type { KeywordsBlock as KeywordsBlockType } from "../../../types";

interface Props {
  block: KeywordsBlockType;
  isEditMode?: boolean;
  onEdit?: (blockId: string, content: unknown) => void;
}

const KeywordsBlock: React.FC<Props> = ({ block, isEditMode, onEdit }) => {
  const { id, items, title } = block;

  return (
    <div className="keywords-block" data-testid="keywords-block">
      {title && (
        <h4
          className="keywords-title font-semibold text-lg mb-2"
          data-testid="keywords-title"
        >
          {title}
        </h4>
      )}

      <div
        className="keywords-container flex flex-wrap gap-2"
        data-testid="keywords-container"
      >
        {items.map((item, index) => (
          <span
            key={`${id}-keyword-${index}`}
            className="keyword-item bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            data-testid={`keyword-item-${index}`}
            onClick={
              isEditMode
                ? () => {
                    if (onEdit) {
                      const newItems = [...items];
                      // 여기서 실제 편집 로직을 구현할 수 있습니다
                      onEdit(id, { items: newItems });
                    }
                  }
                : undefined
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordsBlock;
