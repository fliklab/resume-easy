// 블록 타입 열거형
export enum BlockType {
  KEYWORDS,
  SENTENCE,
  PARAGRAPH,
  MULTI_COLUMN,
  MULTI_ROW,
  FIXED,
  TABLE,
}

// 블록 공통 인터페이스
export interface Block {
  id: string;
  type: BlockType;
  isEditable?: boolean;
}

// 키워즈 블록
export interface KeywordsBlock extends Block {
  type: BlockType.KEYWORDS;
  items: string[];
  title?: string;
}

// 문장 블록
export interface SentenceBlock extends Block {
  type: BlockType.SENTENCE;
  content: string;
}

// 문단 블록
export interface ParagraphBlock extends Block {
  type: BlockType.PARAGRAPH;
  title?: string;
  content: string;
}

// 멀티 칼럼 블록
export interface MultiColumnBlock extends Block {
  type: BlockType.MULTI_COLUMN;
  columns: Block[];
  ratio?: number[]; // 예: [1, 2] => 1:2 비율
}

// 멀티 로우 블록
export interface MultiRowBlock extends Block {
  type: BlockType.MULTI_ROW;
  rows: Block[];
}

// 고정 블록
export interface FixedBlock extends Block {
  type: BlockType.FIXED;
  content: string;
}

// 테이블 블록
export interface TableBlock extends Block {
  type: BlockType.TABLE;
  headers: string[];
  rows: string[][];
}

// 섹션 인터페이스
export interface Section {
  id: string;
  title?: string;
  blocks: Block[];
}

// 문서 인터페이스
export interface Document {
  title: string;
  sections: Section[];
}
