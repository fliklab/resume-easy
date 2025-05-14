import React from "react";
import { Link } from "react-router-dom";
import KeywordsBlock from "../components/blocks/KeywordsBlock";
import SentenceBlock from "../components/blocks/SentenceBlock";
import ParagraphBlock from "../components/blocks/ParagraphBlock";
import MultiColumnBlock from "../components/blocks/MultiColumnBlock";
import MultiRowBlock from "../components/blocks/MultiRowBlock";
import {
  BlockType,
  type KeywordsBlock as KeywordsBlockType,
  type SentenceBlock as SentenceBlockType,
  type ParagraphBlock as ParagraphBlockType,
  type MultiColumnBlock as MultiColumnBlockType,
  type MultiRowBlock as MultiRowBlockType,
} from "../types";

// 테스트용 데이터
const keywordsBlockData: KeywordsBlockType = {
  id: "test-keywords",
  type: BlockType.KEYWORDS,
  title: "키워드 블록 테스트",
  items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "TailwindCSS"],
};

const sentenceBlockData: SentenceBlockType = {
  id: "test-sentence",
  type: BlockType.SENTENCE,
  content: "이것은 문장 블록 테스트입니다.",
};

const paragraphBlockData: ParagraphBlockType = {
  id: "test-paragraph",
  type: BlockType.PARAGRAPH,
  title: "문단 블록 테스트",
  content:
    "이것은 문단 블록 테스트입니다. 문단 블록은 제목과 본문으로 구성됩니다. 본문은 여러 줄로 구성될 수 있으며, 굵은 글씨와 같은 스타일을 적용할 수 있습니다.",
};

const multiColumnBlockData: MultiColumnBlockType = {
  id: "test-multi-column",
  type: BlockType.MULTI_COLUMN,
  columns: [
    {
      id: "col1",
      type: BlockType.SENTENCE,
      content: "첫 번째 칼럼",
    } as SentenceBlockType,
    {
      id: "col2",
      type: BlockType.SENTENCE,
      content: "두 번째 칼럼",
    } as SentenceBlockType,
  ],
  ratio: [1, 1],
};

const multiColumnComplexData: MultiColumnBlockType = {
  id: "test-multi-column-complex",
  type: BlockType.MULTI_COLUMN,
  columns: [
    {
      id: "complex-col1",
      type: BlockType.PARAGRAPH,
      title: "회사명",
      content: "ABC 테크놀로지",
    } as ParagraphBlockType,
    {
      id: "complex-col2",
      type: BlockType.PARAGRAPH,
      content:
        "• 프론트엔드 개발 담당\n• React와 TypeScript 사용\n• 성능 최적화 작업 수행",
    } as ParagraphBlockType,
  ],
  ratio: [1, 3],
};

const MultiRowBlockData: MultiRowBlockType = {
  id: "test-multi-row",
  type: BlockType.MULTI_ROW,
  rows: [
    {
      id: "row1",
      type: BlockType.MULTI_COLUMN,
      ratio: [1.4],
      columns: [
        {
          id: "col1",
          type: BlockType.PARAGRAPH,
          title: "회사명",
          content: "ABC 테크놀로지",
        } as ParagraphBlockType,
        {
          id: "col1",
          type: BlockType.PARAGRAPH,
          title: "두번째",
          content: "카카오뱅크",
        } as ParagraphBlockType,
      ],
    } as MultiColumnBlockType,
    {
      id: "row2",
      type: BlockType.SENTENCE,
      content: "두 번째 행",
    } as SentenceBlockType,
  ],
};

const BlocksTestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link to="/" className="text-blue-500 hover:underline mb-6">
          ← 홈으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-8">
          블록 컴포넌트 테스트 페이지
        </h1>
      </div>

      <div className="space-y-8">
        {/* KeywordsBlock 테스트 */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">KeywordsBlock</h2>
          <div className="bg-gray-50 p-4 rounded">
            <KeywordsBlock block={keywordsBlockData} />
          </div>
        </section>

        {/* SentenceBlock 테스트 */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">SentenceBlock</h2>
          <div className="bg-gray-50 p-4 rounded">
            <SentenceBlock block={sentenceBlockData} />
          </div>
        </section>

        {/* ParagraphBlock 테스트 */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">ParagraphBlock</h2>
          <div className="bg-gray-50 p-4 rounded">
            <ParagraphBlock block={paragraphBlockData} />
          </div>
        </section>

        {/* MultiColumnBlock 테스트 - 기본 */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            MultiColumnBlock (기본)
          </h2>
          <div className="bg-gray-50 p-4 rounded">
            <MultiColumnBlock block={multiColumnBlockData} />
          </div>
        </section>

        {/* MultiColumnBlock 테스트 - 복잡한 구조 */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            MultiColumnBlock (복잡한 구조)
          </h2>
          <div className="bg-gray-50 p-4 rounded">
            <MultiColumnBlock block={multiColumnComplexData} />
          </div>
        </section>

        {/* MultiRowBlockData */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">MultiRowBlock</h2>
          <div className="bg-gray-50 p-4 rounded">
            <MultiRowBlock block={MultiRowBlockData} />
          </div>
        </section>

        {/* 편집 모드 테스트 */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">편집 모드 테스트</h2>
          <div className="bg-gray-50 p-4 rounded">
            <KeywordsBlock
              block={keywordsBlockData}
              isEditMode={true}
              onEdit={() => console.log("편집 모드 활성화")}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlocksTestPage;
