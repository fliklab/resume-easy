import React from "react";
import { parseMarkdown } from "../../../utils/markdown";
import type { FieldPath } from "../../../types/resume";

// 편집 가능한 텍스트 컴포넌트 Props 타입
interface EditableTextProps {
  type?: "text" | "textarea";
  value: string;
  fieldPath: FieldPath;
  className?: string;
  isEditMode: boolean;
  editingField: FieldPath | null;
  onEdit: (fieldPath: FieldPath) => void;
  onChange: (fieldPath: FieldPath, value: string) => void;
  onFinishEdit: () => void;
}

/**
 * 편집 가능한 텍스트 컴포넌트
 * 마크다운 형식 지원 (굵게, 기울임, 링크, 하이라이트)
 */
export const EditableText: React.FC<EditableTextProps> = ({
  type = "text",
  value,
  fieldPath,
  className = "",
  isEditMode,
  editingField,
  onEdit,
  onChange,
  onFinishEdit,
}) => {
  const isEditing = editingField === fieldPath;

  // 마크다운 적용된 HTML 생성
  const formattedHtml = parseMarkdown(value);

  return (
    <div className={`relative group ${className}`}>
      {isEditing ? (
        <div className="flex items-center">
          {type === "textarea" ? (
            <textarea
              className="w-full p-1 border border-blue-400 rounded"
              value={value}
              onChange={(e) => onChange(fieldPath, e.target.value)}
              onBlur={onFinishEdit}
              autoFocus
              rows={3}
            />
          ) : (
            <input
              className="w-full p-1 border border-blue-400 rounded"
              type="text"
              value={value}
              onChange={(e) => onChange(fieldPath, e.target.value)}
              onBlur={onFinishEdit}
              autoFocus
            />
          )}
        </div>
      ) : (
        <>
          <span dangerouslySetInnerHTML={{ __html: formattedHtml }}></span>
          {isEditMode && (
            <button
              className="absolute opacity-0 group-hover:opacity-100 right-0 top-0 text-blue-500 hover:text-blue-700 transition-opacity"
              onClick={() => onEdit(fieldPath)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 ml-1 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};
