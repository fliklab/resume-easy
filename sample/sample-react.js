// @ts-nocheck
import React, { useState, useEffect } from "react";

// 간단한 마크다운 변환 함수
const parseMarkdown = (text) => {
  if (!text) return "";

  // Bold: **text** or __text__
  let formatted = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

  // Italic: *text* or _text_
  formatted = formatted.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  // Links: [text](url)
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>'
  );

  // Highlight: ==text==
  formatted = formatted.replace(
    /==(.*?)==/g,
    '<span class="bg-yellow-200">$1</span>'
  );

  return formatted;
};

const Resume = () => {
  // 편집 모드 상태 관리
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingField, setEditingField] = useState(null);

  // 초기 데이터 상태
  const [resumeData, setResumeData] = useState({
    personal: {
      name: "홍길동",
      title: "시니어 프론트엔드 개발자",
      email: "example@email.com",
      phone: "010-1234-5678",
      github: "github.com/username",
      portfolio: "portfolio.com",
    },
    summary:
      "5년 경력의 React와 TypeScript 전문 웹 개발자로, 사용자 경험 최적화와 확장 가능한 웹 애플리케이션 개발에 특화되어 있습니다. 대규모 트래픽 처리와 복잡한 UI 컴포넌트 설계에 강점이 있으며, 전 직장에서 페이지 로딩 시간을 40% 단축시킨 경험이 있습니다.",
    skills: {
      frontend: "React, TypeScript, JavaScript, HTML5, CSS3, Redux, Next.js",
      backend: "Node.js, Express, RESTful API, GraphQL",
      devtools: "Git, Webpack, Jest, React Testing Library, CI/CD",
      other: "MongoDB, Firebase, AWS, Docker",
    },
    experiences: [
      {
        company: "ABC 테크",
        title: "시니어 프론트엔드 개발자",
        location: "서울, 한국",
        period: "2022년 3월 - 현재",
        achievements: [
          "React와 TypeScript를 활용한 대시보드 애플리케이션 개발로 사용자 생산성 25% 향상",
          "컴포넌트 라이브러리 구축 및 문서화를 통해 개발 주기 30% 단축",
          "성능 최적화를 통해 페이지 로딩 시간 40% 감소 및 사용자 이탈률 15% 감소",
        ],
      },
      {
        company: "XYZ 소프트웨어",
        title: "프론트엔드 개발자",
        location: "부산, 한국",
        period: "2020년 5월 - 2022년 2월",
        achievements: [
          "React 기반 e-커머스 플랫폼 개발에 참여하여 월간 트래픽 50만 명 처리",
          "Redux를 활용한 상태 관리 최적화로 애플리케이션 안정성 20% 향상",
          "반응형 디자인 구현으로 모바일 사용자 전환율 35% 증가",
        ],
      },
      {
        company: "스타트업 인큐베이터",
        title: "주니어 개발자",
        location: "서울, 한국",
        period: "2019년 1월 - 2020년 4월",
        achievements: [
          "JavaScript와 jQuery를 사용한 웹 애플리케이션 유지보수 및 기능 개선",
          "React로의 마이그레이션 프로젝트에 참여하여 레거시 코드 현대화",
          "UI/UX 개선을 통해 사용자 세션 시간 22% 증가",
        ],
      },
    ],
    projects: [
      {
        name: "실시간 협업 툴",
        tech: "React, TypeScript, Socket.io",
        description:
          "분산 팀을 위한 실시간 문서 협업 도구 개발. WebSocket을 활용한 실시간 동기화 구현으로 팀 생산성 40% 향상.",
        link: "github.com/username/project1",
      },
      {
        name: "AI 기반 대시보드",
        tech: "React, TypeScript, D3.js",
        description:
          "데이터 시각화와 예측 분석을 위한 대시보드 개발. 복잡한 데이터를 직관적인 차트로 표현하여 의사결정 시간 30% 단축.",
        link: "github.com/username/project2",
      },
    ],
    education: {
      degree: "컴퓨터 공학 학사",
      institution: "한국 공과대학교",
      period: "2015년 - 2019년",
    },
    certifications: [
      "AWS 공인 개발자 - 어소시에이트 (2023)",
      "React 고급 개발자 과정 수료 (2022)",
      "TypeScript 마스터 클래스 수료 (2021)",
    ],
  });

  // 편집 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditingField(null);
  };

  // 필드 편집 시작 핸들러
  const handleEditField = (fieldPath) => {
    setEditingField(fieldPath);
  };

  // 필드 값 변경 핸들러
  const handleFieldChange = (fieldPath, value) => {
    // fieldPath는 "personal.name"과 같은 형식의 경로
    const paths = fieldPath.split(".");

    if (paths.length === 1) {
      // 최상위 필드인 경우
      setResumeData({
        ...resumeData,
        [paths[0]]: value,
      });
    } else if (paths.length === 2) {
      // 중첩된 객체의 필드인 경우
      setResumeData({
        ...resumeData,
        [paths[0]]: {
          ...resumeData[paths[0]],
          [paths[1]]: value,
        },
      });
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
    } else if (paths.length === 2 && paths[0] === "certifications") {
      // certifications 배열의 항목인 경우
      const index = parseInt(paths[1]);

      const updatedCertifications = [...resumeData.certifications];
      updatedCertifications[index] = value;

      setResumeData({
        ...resumeData,
        certifications: updatedCertifications,
      });
    }
  };

  // 편집 완료 핸들러
  const handleFinishEdit = () => {
    setEditingField(null);
  };

  // 편집 가능한 텍스트 컴포넌트
  const EditableText = ({
    type = "text",
    value,
    fieldPath,
    className = "",
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
                onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
                onBlur={handleFinishEdit}
                autoFocus
                rows={3}
              />
            ) : (
              <input
                className="w-full p-1 border border-blue-400 rounded"
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(fieldPath, e.target.value)}
                onBlur={handleFinishEdit}
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
                onClick={() => handleEditField(fieldPath)}
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <EditableText
                value={resumeData.personal.name}
                fieldPath="personal.name"
              />
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              <EditableText
                value={resumeData.personal.title}
                fieldPath="personal.title"
              />
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="mr-1">📧</span>
                <EditableText
                  value={resumeData.personal.email}
                  fieldPath="personal.email"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-1">📱</span>
                <EditableText
                  value={resumeData.personal.phone}
                  fieldPath="personal.phone"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-1">🔗</span>
                <EditableText
                  value={resumeData.personal.github}
                  fieldPath="personal.github"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-1">🌐</span>
                <EditableText
                  value={resumeData.personal.portfolio}
                  fieldPath="personal.portfolio"
                />
              </div>
            </div>
          </div>

          {/* 전문 요약 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              직무 요약
            </h2>
            <p className="text-gray-700">
              <EditableText
                type="textarea"
                value={resumeData.summary}
                fieldPath="summary"
              />
            </p>
          </div>

          {/* 기술 스택 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              기술 스택
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">프론트엔드</h3>
                <p className="text-gray-600">
                  <EditableText
                    value={resumeData.skills.frontend}
                    fieldPath="skills.frontend"
                  />
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">백엔드</h3>
                <p className="text-gray-600">
                  <EditableText
                    value={resumeData.skills.backend}
                    fieldPath="skills.backend"
                  />
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">개발 도구</h3>
                <p className="text-gray-600">
                  <EditableText
                    value={resumeData.skills.devtools}
                    fieldPath="skills.devtools"
                  />
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">기타</h3>
                <p className="text-gray-600">
                  <EditableText
                    value={resumeData.skills.other}
                    fieldPath="skills.other"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* 직무 경험 (멀티 칼럼) */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              직무 경험
            </h2>

            {resumeData.experiences.map((exp, index) => (
              <div
                key={index}
                className={
                  index < resumeData.experiences.length - 1 ? "mb-5" : ""
                }
              >
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="col-span-1">
                    <h3 className="font-bold text-gray-800">
                      <EditableText
                        value={`${exp.company} - ${exp.title}`}
                        fieldPath={`experiences.${index}.company`}
                      />
                    </h3>
                    <p className="text-sm text-gray-600">
                      <EditableText
                        value={exp.location}
                        fieldPath={`experiences.${index}.location`}
                      />
                    </p>
                  </div>
                  <div className="col-span-1 text-right">
                    <p className="text-sm text-gray-600">
                      <EditableText
                        value={exp.period}
                        fieldPath={`experiences.${index}.period`}
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
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 프로젝트 섹션 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              주요 프로젝트
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded p-4">
                  <h3 className="font-bold text-gray-800 mb-1">
                    <EditableText
                      value={project.name}
                      fieldPath={`projects.${index}.name`}
                    />
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <EditableText
                      value={project.tech}
                      fieldPath={`projects.${index}.tech`}
                    />
                  </p>
                  <p className="text-gray-700">
                    <EditableText
                      value={project.description}
                      fieldPath={`projects.${index}.description`}
                    />
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    <EditableText
                      value={project.link}
                      fieldPath={`projects.${index}.link`}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              교육
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h3 className="font-bold text-gray-800">
                  <EditableText
                    value={resumeData.education.degree}
                    fieldPath="education.degree"
                  />
                </h3>
                <p className="text-gray-700">
                  <EditableText
                    value={resumeData.education.institution}
                    fieldPath="education.institution"
                  />
                </p>
              </div>
              <div className="col-span-1 text-right">
                <p className="text-gray-600">
                  <EditableText
                    value={resumeData.education.period}
                    fieldPath="education.period"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* 자격증 및 교육 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
              자격증 및 교육
            </h2>
            <ul className="list-disc list-outside text-gray-700 pl-8">
              {resumeData.certifications.map((cert, index) => (
                <li key={index} className="mb-1">
                  <div className="pl-1">
                    <EditableText
                      value={cert}
                      fieldPath={`certifications.${index}`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
