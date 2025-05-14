import React from "react";

interface SectionTitleProps {
  title: string;
}

/**
 * 이력서 섹션 제목 컴포넌트
 * 일관된 스타일로 섹션 제목 표시
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
      {title}
    </h2>
  );
};
