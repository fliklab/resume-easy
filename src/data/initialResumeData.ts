import type { ResumeData } from "../types/resume";

// 초기 데이터 상태
export const initialResumeData: ResumeData = {
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
};
