import React from "react";
import { EditableText } from "./EditableText";
import { SectionTitle } from "./SectionTitle";
import type { FieldPath, Education } from "../../../types/resume";

interface EducationSectionProps {
  education: Education;
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 교육 섹션 컴포넌트
 * 학위, 기관, 기간 정보 표시
 */
export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div className="mb-6">
      <SectionTitle title="학력" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h3 className="font-bold text-gray-800">
            <EditableText
              value={education.degree}
              fieldPath="education.degree"
              isEditMode={isEditMode}
              editingField={editingField}
              onEdit={onEditField}
              onChange={onFieldChange}
              onFinishEdit={onFinishEdit}
            />
          </h3>
          <p className="text-gray-700">
            <EditableText
              value={education.institution}
              fieldPath="education.institution"
              isEditMode={isEditMode}
              editingField={editingField}
              onEdit={onEditField}
              onChange={onFieldChange}
              onFinishEdit={onFinishEdit}
            />
          </p>
        </div>
        <div className="col-span-1 text-right">
          <p className="text-gray-600">
            <EditableText
              value={education.period}
              fieldPath="education.period"
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
