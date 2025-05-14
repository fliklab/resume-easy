import React from "react";
import { EditableText } from "./EditableText";
import { SectionTitle } from "./SectionTitle";
import type { FieldPath, Skills } from "../../../types/resume";

interface SkillsSectionProps {
  skills: Skills;
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 기술 스택 섹션 컴포넌트
 * 프론트엔드, 백엔드, 개발 도구, 기타 기술 목록 표시
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div className="mb-6">
      <SectionTitle title="기술 스택" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-700">프론트엔드</h3>
          <p className="text-gray-600">
            <EditableText
              value={skills.frontend}
              fieldPath="skills.frontend"
              isEditMode={isEditMode}
              editingField={editingField}
              onEdit={onEditField}
              onChange={onFieldChange}
              onFinishEdit={onFinishEdit}
            />
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">백엔드</h3>
          <p className="text-gray-600">
            <EditableText
              value={skills.backend}
              fieldPath="skills.backend"
              isEditMode={isEditMode}
              editingField={editingField}
              onEdit={onEditField}
              onChange={onFieldChange}
              onFinishEdit={onFinishEdit}
            />
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">개발 도구</h3>
          <p className="text-gray-600">
            <EditableText
              value={skills.devtools}
              fieldPath="skills.devtools"
              isEditMode={isEditMode}
              editingField={editingField}
              onEdit={onEditField}
              onChange={onFieldChange}
              onFinishEdit={onFinishEdit}
            />
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">기타</h3>
          <p className="text-gray-600">
            <EditableText
              value={skills.other}
              fieldPath="skills.other"
              isEditMode={isEditMode}
              editingField={editingField}
              onEdit={onEditField}
              onChange={onFieldChange}
              onFinishEdit={onFinishEdit}
            />
          </p>
        </div>
      </div>
    </div>
  );
};
