import React from "react";
import { EditableText } from "./EditableText";
import { SectionTitle } from "./SectionTitle";
import type { FieldPath } from "../../../types/resume";

interface CertificationsSectionProps {
  certifications: string[];
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 자격증 섹션 컴포넌트
 * 자격증 및 교육 목록 표시
 */
export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div>
      <SectionTitle title="자격증 및 교육" />
      <ul className="list-disc list-outside text-gray-700 pl-8">
        {certifications.map((cert, index) => (
          <li key={index} className="mb-1">
            <div className="pl-1">
              <EditableText
                value={cert}
                fieldPath={`certifications.${index}`}
                isEditMode={isEditMode}
                editingField={editingField}
                onEdit={onEditField}
                onChange={onFieldChange}
                onFinishEdit={onFinishEdit}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
