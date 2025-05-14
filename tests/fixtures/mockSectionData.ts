import {
  BlockType,
  type Section,
  type KeywordsBlock,
  type ParagraphBlock,
} from "../../src/types";

// 기술 스택 섹션 데이터
export const mockSkillsSection: Section = {
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
};

// 제목 없는 섹션 데이터
export const mockSectionWithoutTitle: Section = {
  id: "summary",
  blocks: [
    {
      id: "summary-content",
      type: BlockType.PARAGRAPH,
      content:
        "5년 경력의 React와 TypeScript 전문 웹 개발자로, 사용자 경험 최적화와 확장 가능한 웹 애플리케이션 개발에 특화되어 있습니다.",
    } as ParagraphBlock,
  ],
};
