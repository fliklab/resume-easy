import React from "react";
import { EditableText } from "./EditableText";
import { SectionTitle } from "./SectionTitle";
import type { FieldPath, Experience } from "../../../types/resume";

interface ExperienceSectionProps {
  experiences: Experience[];
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 직무 경험 섹션 컴포넌트
 * 회사 정보 및 업적 목록 표시
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div className="mb-6">
      <SectionTitle title="직무 경험" />

      {experiences.map((exp, index) => (
        <div
          key={index}
          className={index < experiences.length - 1 ? "mb-5" : ""}
        >
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="col-span-1">
              <h3 className="font-bold text-gray-800">
                <EditableText
                  value={`${exp.company} - ${exp.title}`}
                  fieldPath={`experiences.${index}.company`}
                  isEditMode={isEditMode}
                  editingField={editingField}
                  onEdit={onEditField}
                  onChange={onFieldChange}
                  onFinishEdit={onFinishEdit}
                />
              </h3>
              <p className="text-sm text-gray-600">
                <EditableText
                  value={exp.location}
                  fieldPath={`experiences.${index}.location`}
                  isEditMode={isEditMode}
                  editingField={editingField}
                  onEdit={onEditField}
                  onChange={onFieldChange}
                  onFinishEdit={onFinishEdit}
                />
              </p>
            </div>
            <div className="col-span-1 text-right">
              <p className="text-sm text-gray-600">
                <EditableText
                  value={exp.period}
                  fieldPath={`experiences.${index}.period`}
                  isEditMode={isEditMode}
                  editingField={editingField}
                  onEdit={onEditField}
                  onChange={onFieldChange}
                  onFinishEdit={onFinishEdit}
                />
              </p>
            </div>
          </div>
          <ul className="list-disc list-outside text-gray-700 pl-8">
            {exp.achievements.map((achievement, achieveIndex) => (
              <li key={achieveIndex} className="mb-1">
                <div className="pl-1">
                  <EditableText
                    value={achievement}
                    fieldPath={`experiences.${index}.achievements.${achieveIndex}`}
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
      ))}
    </div>
  );
};
