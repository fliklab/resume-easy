import React from "react";
import { EditableText } from "./EditableText";
import type { FieldPath } from "../../../types/resume";
import { SectionTitle } from "./SectionTitle";

interface SummarySectionProps {
  summary: string;
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 요약 섹션 컴포넌트
 * 직무 요약 정보 표시
 */
export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div className="mb-6">
      <SectionTitle title="직무 요약" />
      <p className="text-gray-700">
        <EditableText
          type="textarea"
          value={summary}
          fieldPath="summary"
          isEditMode={isEditMode}
          editingField={editingField}
          onEdit={onEditField}
          onChange={onFieldChange}
          onFinishEdit={onFinishEdit}
        />
      </p>
    </div>
  );
};
