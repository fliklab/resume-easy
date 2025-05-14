import React from "react";
import { useResumeEditor } from "../hooks/useResumeEditor";
import { initialResumeData } from "../data/initialResumeData";
import {
  HeaderSection,
  SummarySection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
  CertificationsSection,
} from "../components/document/sections";

/**
 * 기본 이력서 페이지 컴포넌트
 * 구조화된 컴포넌트와 로직을 사용하여 이력서 페이지 구현
 */
const DefaultResume: React.FC = () => {
  // 이력서 편집 로직 커스텀 훅을 사용하여 상태 및 기능 관리
  const {
    resumeData,
    isEditMode,
    editingField,
    toggleEditMode,
    handleEditField,
    handleFieldChange,
    handleFinishEdit,
  } = useResumeEditor(initialResumeData);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* 편집 모드 토글 버튼 */}
      <div className="w-full max-w-4xl flex justify-between mb-2">
        <div className="px-4 py-2 text-sm text-gray-600">
          {isEditMode && (
            <span>
              마크다운 지원: <strong>**굵게**</strong>, <em>*기울임*</em>,{" "}
              <span className="bg-yellow-200">==하이라이트==</span>, [링크](URL)
            </span>
          )}
        </div>
        <button
          className={`px-4 py-2 rounded ${
            isEditMode
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
          onClick={toggleEditMode}
        >
          {isEditMode ? "편집 완료" : "편집 모드"}
        </button>
      </div>

      {/* 이력서 컨테이너 */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-4">
        {/* 페이지 여백을 주는 컨테이너 */}
        <div className="p-8">
          {/* 헤더 섹션 */}
          <HeaderSection
            personal={resumeData.personal}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />

          {/* 전문 요약 */}
          <SummarySection
            summary={resumeData.summary}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />

          {/* 기술 스택 */}
          <SkillsSection
            skills={resumeData.skills}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />

          {/* 직무 경험 */}
          <ExperienceSection
            experiences={resumeData.experiences}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />

          {/* 프로젝트 섹션 */}
          <ProjectsSection
            projects={resumeData.projects}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />

          {/* 교육 */}
          <EducationSection
            education={resumeData.education}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />

          {/* 자격증 및 교육 */}
          <CertificationsSection
            certifications={resumeData.certifications}
            isEditMode={isEditMode}
            editingField={editingField}
            onEditField={handleEditField}
            onFieldChange={handleFieldChange}
            onFinishEdit={handleFinishEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultResume;
