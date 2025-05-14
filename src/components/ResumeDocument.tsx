import React from "react";
import type { Document } from "../types";
import SkillsSection from "./sections/SkillsSection";

interface Props {
  document: Document;
  isEditMode?: boolean;
  onEdit?: (sectionId: string, blockId: string, content: unknown) => void;
}

const ResumeDocument: React.FC<Props> = ({ document, isEditMode, onEdit }) => {
  const { title, sections } = document;

  const renderSection = (section: (typeof sections)[0]) => {
    switch (section.id) {
      case "skills":
        return (
          <SkillsSection
            key={section.id}
            section={section}
            isEditMode={isEditMode}
            onEdit={onEdit}
          />
        );

      // 다른 섹션 타입들도 여기에 추가

      default:
        // 기본 섹션 렌더링
        return (
          <div
            key={section.id}
            className="section default-section"
            data-testid="default-section"
            data-section-id={section.id}
          >
            {section.title && (
              <h2 className="section-title">{section.title}</h2>
            )}
            <div className="section-content">
              {/* 추후 블록 렌더링 로직을 여기에 추가 */}
              <p>섹션 내용이 렌더링되지 않았습니다.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="resume-document" data-testid="resume-document">
      <h1 className="document-title" data-testid="document-title">
        {title}
      </h1>

      <div className="document-content">{sections.map(renderSection)}</div>
    </div>
  );
};

export default ResumeDocument;
