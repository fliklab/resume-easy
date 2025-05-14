import { useState } from "react";
import type { FieldPath, ResumeData } from "../types/resume";

interface UseResumeEditorReturn {
  resumeData: ResumeData;
  isEditMode: boolean;
  editingField: FieldPath | null;
  toggleEditMode: () => void;
  handleEditField: (fieldPath: FieldPath) => void;
  handleFieldChange: (fieldPath: FieldPath, value: string) => void;
  handleFinishEdit: () => void;
}

/**
 * 이력서 데이터 관리 및 편집 기능을 제공하는 커스텀 훅
 */
export const useResumeEditor = (
  initialData: ResumeData
): UseResumeEditorReturn => {
  // 편집 모드 상태 관리
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<FieldPath | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  // 편집 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditingField(null);
  };

  // 필드 편집 시작 핸들러
  const handleEditField = (fieldPath: FieldPath) => {
    setEditingField(fieldPath);
  };

  // 필드 값 변경 핸들러
  const handleFieldChange = (fieldPath: FieldPath, value: string) => {
    // fieldPath는 "personal.name"과 같은 형식의 경로
    const paths = fieldPath.split(".");

    if (paths.length === 1) {
      // 최상위 필드인 경우
      setResumeData({
        ...resumeData,
        [paths[0]]: value,
      } as ResumeData);
    } else if (paths.length === 2) {
      // 중첩된 객체의 필드인 경우
      const section = paths[0] as keyof ResumeData;
      const field = paths[1];

      if (section === "certifications") {
        // certifications 배열의 항목인 경우
        const index = parseInt(field);
        const updatedCertifications = [...resumeData.certifications];
        updatedCertifications[index] = value;

        setResumeData({
          ...resumeData,
          certifications: updatedCertifications,
        });
      } else {
        // 객체의 속성인 경우 - 타입 안전한 방식으로 접근
        if (
          section === "personal" ||
          section === "skills" ||
          section === "education"
        ) {
          const sectionData = { ...resumeData[section] };
          // 타입 단언 대신 구체적인 타입 처리
          if (section === "personal") {
            (sectionData as Record<string, string>)[field] = value;
          } else if (section === "skills") {
            (sectionData as Record<string, string>)[field] = value;
          } else if (section === "education") {
            (sectionData as Record<string, string>)[field] = value;
          }

          setResumeData({
            ...resumeData,
            [section]: sectionData,
          });
        }
      }
    } else if (paths.length === 3 && paths[0] === "experiences") {
      // experiences 배열 내 객체의 필드인 경우
      const index = parseInt(paths[1]);
      const field = paths[2];

      const updatedExperiences = [...resumeData.experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [field]: value,
      };

      setResumeData({
        ...resumeData,
        experiences: updatedExperiences,
      });
    } else if (
      paths.length === 4 &&
      paths[0] === "experiences" &&
      paths[2] === "achievements"
    ) {
      // experiences 배열 내 업적 배열의 항목인 경우
      const expIndex = parseInt(paths[1]);
      const achievementIndex = parseInt(paths[3]);

      const updatedExperiences = [...resumeData.experiences];
      const updatedAchievements = [
        ...updatedExperiences[expIndex].achievements,
      ];
      updatedAchievements[achievementIndex] = value;

      updatedExperiences[expIndex] = {
        ...updatedExperiences[expIndex],
        achievements: updatedAchievements,
      };

      setResumeData({
        ...resumeData,
        experiences: updatedExperiences,
      });
    } else if (paths.length === 3 && paths[0] === "projects") {
      // projects 배열 내 객체의 필드인 경우
      const index = parseInt(paths[1]);
      const field = paths[2];

      const updatedProjects = [...resumeData.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };

      setResumeData({
        ...resumeData,
        projects: updatedProjects,
      });
    }
  };

  // 편집 완료 핸들러
  const handleFinishEdit = () => {
    setEditingField(null);
  };

  return {
    resumeData,
    isEditMode,
    editingField,
    toggleEditMode,
    handleEditField,
    handleFieldChange,
    handleFinishEdit,
  };
};
