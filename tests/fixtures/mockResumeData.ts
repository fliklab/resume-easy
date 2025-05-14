import {
  BlockType,
  type Document,
  type SentenceBlock,
  type MultiColumnBlock,
  type ParagraphBlock,
  type KeywordsBlock,
} from "../../src/types";

// 모의 이력서 데이터
export const mockResumeData: Document = {
  title: "개발자 이력서",
  sections: [
    // 프로필 섹션
    {
      id: "profile",
      blocks: [
        {
          id: "name",
          type: BlockType.SENTENCE,
          content: "홍길동",
        } as SentenceBlock,
        {
          id: "title",
          type: BlockType.SENTENCE,
          content: "시니어 프론트엔드 개발자",
        } as SentenceBlock,
        {
          id: "contact",
          type: BlockType.MULTI_COLUMN,
          columns: [
            {
              id: "email",
              type: BlockType.SENTENCE,
              content: "example@email.com",
            } as SentenceBlock,
            {
              id: "phone",
              type: BlockType.SENTENCE,
              content: "010-1234-5678",
            } as SentenceBlock,
            {
              id: "github",
              type: BlockType.SENTENCE,
              content: "github.com/username",
            } as SentenceBlock,
            {
              id: "website",
              type: BlockType.SENTENCE,
              content: "portfolio.com",
            } as SentenceBlock,
          ],
          ratio: [1, 1, 1, 1],
        } as MultiColumnBlock,
      ],
    },

    // 요약 섹션
    {
      id: "summary",
      blocks: [
        {
          id: "summary-content",
          type: BlockType.PARAGRAPH,
          content:
            "5년 경력의 React와 TypeScript 전문 웹 개발자로, 사용자 경험 최적화와 확장 가능한 웹 애플리케이션 개발에 특화되어 있습니다. 대규모 트래픽 처리와 복잡한 UI 컴포넌트 설계에 강점이 있으며, 전 직장에서 페이지 로딩 시간을 40% 단축시킨 경험이 있습니다.",
        } as ParagraphBlock,
      ],
    },

    // 기술 스택 섹션
    {
      id: "skills",
      title: "기술 스택",
      blocks: [
        {
          id: "frontend-skills",
          type: BlockType.KEYWORDS,
          title: "프론트엔드",
          items: [
            "React",
            "TypeScript",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Redux",
            "Next.js",
          ],
        } as KeywordsBlock,
        {
          id: "backend-skills",
          type: BlockType.KEYWORDS,
          title: "백엔드",
          items: ["Node.js", "Express", "RESTful API", "GraphQL"],
        } as KeywordsBlock,
      ],
    },

    // 경력 섹션
    {
      id: "experience",
      title: "직무 경험",
      blocks: [
        {
          id: "job1",
          type: BlockType.MULTI_COLUMN,
          columns: [
            {
              id: "job1-company",
              type: BlockType.PARAGRAPH,
              title: "ABC 테크",
              content: "시니어 프론트엔드 개발자",
            } as ParagraphBlock,
            {
              id: "job1-description",
              type: BlockType.PARAGRAPH,
              content:
                "- React와 TypeScript를 활용한 대시보드 애플리케이션 개발\n- 컴포넌트 라이브러리 구축 및 문서화\n- 성능 최적화를 통해 페이지 로딩 시간 40% 감소",
            } as ParagraphBlock,
          ],
          ratio: [1, 4],
        } as MultiColumnBlock,
      ],
    },
  ],
};
