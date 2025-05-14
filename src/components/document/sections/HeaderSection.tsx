import React from "react";
import { EditableText } from "./EditableText";
import type { Personal, FieldPath } from "../../../types/resume";

interface HeaderSectionProps {
  personal: Personal;
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 헤더 섹션 컴포넌트
 * 이름, 직함, 연락처 정보 표시
 */
export const HeaderSection: React.FC<HeaderSectionProps> = ({
  personal,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        <EditableText
          value={personal.name}
          fieldPath="personal.name"
          isEditMode={isEditMode}
          editingField={editingField}
          onEdit={onEditField}
          onChange={onFieldChange}
          onFinishEdit={onFinishEdit}
        />
      </h1>
      <p className="text-lg text-gray-600 mt-1">
        <EditableText
          value={personal.title}
          fieldPath="personal.title"
          isEditMode={isEditMode}
          editingField={editingField}
          onEdit={onEditField}
          onChange={onFieldChange}
          onFinishEdit={onFinishEdit}
        />
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-1">📧</span>
          <EditableText
            value={personal.email}
            fieldPath="personal.email"
            isEditMode={isEditMode}
            editingField={editingField}
            onEdit={onEditField}
            onChange={onFieldChange}
            onFinishEdit={onFinishEdit}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-1">📱</span>
          <EditableText
            value={personal.phone}
            fieldPath="personal.phone"
            isEditMode={isEditMode}
            editingField={editingField}
            onEdit={onEditField}
            onChange={onFieldChange}
            onFinishEdit={onFinishEdit}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-1">🔗</span>
          <EditableText
            value={personal.github}
            fieldPath="personal.github"
            isEditMode={isEditMode}
            editingField={editingField}
            onEdit={onEditField}
            onChange={onFieldChange}
            onFinishEdit={onFinishEdit}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-1">🌐</span>
          <EditableText
            value={personal.portfolio}
            fieldPath="personal.portfolio"
            isEditMode={isEditMode}
            editingField={editingField}
            onEdit={onEditField}
            onChange={onFieldChange}
            onFinishEdit={onFinishEdit}
          />
        </div>
      </div>
    </div>
  );
};
