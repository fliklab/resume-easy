import React from "react";
import { EditableText } from "./EditableText";
import { SectionTitle } from "./SectionTitle";
import type { FieldPath, Project } from "../../../types/resume";

interface ProjectsSectionProps {
  projects: Project[];
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEditField: (fieldPath: FieldPath) => void;
  onFieldChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 이력서 프로젝트 섹션 컴포넌트
 * 프로젝트 목록 표시
 */
export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isEditMode,
  editingField,
  onEditField,
  onFieldChange,
  onFinishEdit,
}) => {
  return (
    <div className="mb-6">
      <SectionTitle title="주요 프로젝트" />

      <div className="grid grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded p-4">
            <h3 className="font-bold text-gray-800 mb-1">
              <EditableText
                value={project.name}
                fieldPath={`projects.${index}.name`}
                isEditMode={isEditMode}
                editingField={editingField}
                onEdit={onEditField}
                onChange={onFieldChange}
                onFinishEdit={onFinishEdit}
              />
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <EditableText
                value={project.tech}
                fieldPath={`projects.${index}.tech`}
                isEditMode={isEditMode}
                editingField={editingField}
                onEdit={onEditField}
                onChange={onFieldChange}
                onFinishEdit={onFinishEdit}
              />
            </p>
            <p className="text-gray-700">
              <EditableText
                value={project.description}
                fieldPath={`projects.${index}.description`}
                isEditMode={isEditMode}
                editingField={editingField}
                onEdit={onEditField}
                onChange={onFieldChange}
                onFinishEdit={onFinishEdit}
              />
            </p>
            <p className="text-sm text-blue-600 mt-2">
              <EditableText
                value={project.link}
                fieldPath={`projects.${index}.link`}
                isEditMode={isEditMode}
                editingField={editingField}
                onEdit={onEditField}
                onChange={onFieldChange}
                onFinishEdit={onFinishEdit}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
