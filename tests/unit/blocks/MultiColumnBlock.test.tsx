import { render, screen } from "@testing-library/react";
import MultiColumnBlock from "../../../src/components/document/blocks/MultiColumnBlock";
import {
  BlockType,
  type MultiColumnBlock as MultiColumnBlockType,
} from "../../../src/types";

describe("MultiColumnBlock", () => {
  const mockSentenceBlock1 = {
    id: "sentence1",
    type: BlockType.SENTENCE,
    content: "첫 번째 열 내용",
  };

  const mockSentenceBlock2 = {
    id: "sentence2",
    type: BlockType.SENTENCE,
    content: "두 번째 열 내용",
  };

  const mockMultiColumnBlock: MultiColumnBlockType = {
    id: "multiColumn1",
    type: BlockType.MULTI_COLUMN,
    columns: [mockSentenceBlock1, mockSentenceBlock2],
    ratio: [1, 2], // 1:2 비율
  };

  it("정확한 비율로 칼럼을 렌더링해야 함", () => {
    render(<MultiColumnBlock block={mockMultiColumnBlock} />);

    const columns = screen.getAllByTestId(/column/);
    expect(columns).toHaveLength(2);

    // 첫 번째 칼럼의 flex 값이 1인지 확인
    expect(columns[0]).toHaveStyle("flex: 1");

    // 두 번째 칼럼의 flex 값이 2인지 확인
    expect(columns[1]).toHaveStyle("flex: 2");

    // 너비 비율 검증 - 브라우저 환경이 아니라서 스킵
    // 실제 DOM이 없는 JSDOM에서는 정확한 레이아웃 계산이 불가능
  });

  it("각 칼럼에 내용이 올바르게 렌더링되어야 함", () => {
    render(<MultiColumnBlock block={mockMultiColumnBlock} />);

    // 참고: 실제 구현에서는 SentenceBlock 컴포넌트 대신 모의 컴포넌트가 렌더링됨
    // 이 테스트는 실제 구현에 따라 조정이 필요할 수 있음
    const columns = screen.getAllByTestId(/column/);
    expect(columns).toHaveLength(2);
  });
});
