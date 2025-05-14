import React from "react";
import type { Section } from "../../types";
import { renderBlock } from "../../utils/blockRenderer";

interface Props {
  section: Section;
  isEditMode?: boolean;
  onEdit?: (sectionId: string, blockId: string, content: unknown) => void;
}

const SkillsSection: React.FC<Props> = ({ section, isEditMode, onEdit }) => {
  const { id, title, blocks } = section;

  const handleEdit = (blockId: string, content: unknown) => {
    onEdit?.(id, blockId, content);
  };

  return (
    <div
      className="section skills-section"
      data-testid="skills-section"
      data-section-id={id}
    >
      {title && (
        <h2 className="section-title" data-testid="section-title">
          {title}
        </h2>
      )}

      <div className="section-content skills-grid" data-testid="skills-grid">
        {blocks.map((block) => (
          <div key={block.id} className="skill-category-wrapper">
            {renderBlock(block, isEditMode, handleEdit)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
