import { render, screen } from "@testing-library/react";
import SentenceBlock from "../../../src/components/document/blocks/SentenceBlock";
import {
  BlockType,
  type SentenceBlock as SentenceBlockType,
} from "../../../src/types";

describe("SentenceBlock", () => {
  const mockSentenceBlock: SentenceBlockType = {
    id: "sentence1",
    type: BlockType.SENTENCE,
    content: "간단한 **굵은** 텍스트와 *기울임* 텍스트를 포함한 문장",
  };

  const mockSentenceBlockWithLink: SentenceBlockType = {
    id: "sentence2",
    type: BlockType.SENTENCE,
    content: "이것은 [링크](https://example.com)를 포함한 문장",
  };

  const mockSentenceBlockWithHighlight: SentenceBlockType = {
    id: "sentence3",
    type: BlockType.SENTENCE,
    content: "이것은 ==하이라이트== 텍스트를 포함한 문장",
  };

  it("일반 텍스트가 올바르게 렌더링되어야 함", () => {
    render(<SentenceBlock block={mockSentenceBlock} />);

    const blockElement = screen.getByTestId("sentence-block");
    expect(blockElement).toBeInTheDocument();

    // 마크다운 적용 후에는 HTML 태그가 삽입되므로 이렇게 테스트하지 못함
    // 대신 HTML 변환 여부만 확인
    expect(blockElement.innerHTML).toContain("<strong>");
    expect(blockElement.innerHTML).toContain("<em>");
  });

  it("링크가 올바르게 렌더링되어야 함", () => {
    render(<SentenceBlock block={mockSentenceBlockWithLink} />);

    const blockElement = screen.getByTestId("sentence-block");
    expect(blockElement.innerHTML).toContain('<a href="https://example.com"');
  });

  it("하이라이트가 올바르게 렌더링되어야 함", () => {
    render(<SentenceBlock block={mockSentenceBlockWithHighlight} />);

    const blockElement = screen.getByTestId("sentence-block");
    expect(blockElement.innerHTML).toContain('<span class="highlight">');
  });

  it("편집 모드에서는 마크다운이 적용되지 않아야 함", () => {
    render(<SentenceBlock block={mockSentenceBlock} isEditMode={true} />);

    const blockElement = screen.getByTestId("sentence-block");
    expect(blockElement.textContent).toBe(
      "간단한 **굵은** 텍스트와 *기울임* 텍스트를 포함한 문장"
    );
    expect(blockElement.innerHTML).not.toContain("<strong>");
    expect(blockElement.innerHTML).not.toContain("<em>");
  });
});
