import { render, screen } from "@testing-library/react";
import ParagraphBlock from "../../../src/components/document/blocks/ParagraphBlock";
import {
  BlockType,
  type ParagraphBlock as ParagraphBlockType,
} from "../../../src/types";

describe("ParagraphBlock", () => {
  const mockParagraphBlock: ParagraphBlockType = {
    id: "paragraph1",
    type: BlockType.PARAGRAPH,
    title: "테스트 제목",
    content:
      "이것은 **굵은** 글씨와 *기울임* 글씨를 포함한\n여러 줄의 문단입니다.",
  };

  const mockParagraphBlockWithoutTitle: ParagraphBlockType = {
    id: "paragraph2",
    type: BlockType.PARAGRAPH,
    content: "이것은 제목이 없는 문단입니다.",
  };

  it("제목과 내용이 올바르게 렌더링되어야 함", () => {
    render(<ParagraphBlock block={mockParagraphBlock} />);

    // 제목 확인
    const title = screen.getByTestId("paragraph-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("테스트 제목");

    // 내용 확인
    const content = screen.getByTestId("paragraph-content");
    expect(content).toBeInTheDocument();

    // 마크다운 변환 확인
    expect(content.innerHTML).toContain("<strong>");
    expect(content.innerHTML).toContain("<em>");
    expect(content.innerHTML).toMatch(/<br\s*\/?>/);
  });

  it("제목 없이 내용만 렌더링되어야 함", () => {
    render(<ParagraphBlock block={mockParagraphBlockWithoutTitle} />);

    // 제목이 없는지 확인
    expect(screen.queryByTestId("paragraph-title")).not.toBeInTheDocument();

    // 내용만 있는지 확인
    const content = screen.getByTestId("paragraph-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("이것은 제목이 없는 문단입니다.");
  });

  it("편집 모드에서는 마크다운이 적용되지 않아야 함", () => {
    render(<ParagraphBlock block={mockParagraphBlock} isEditMode={true} />);

    const content = screen.getByTestId("paragraph-content");
    expect(content.textContent).toContain(
      "이것은 **굵은** 글씨와 *기울임* 글씨를 포함한"
    );
    expect(content.textContent).toContain("여러 줄의 문단입니다.");
    expect(content.innerHTML).not.toContain("<strong>");
    expect(content.innerHTML).not.toContain("<em>");
    expect(content.innerHTML).not.toMatch(/<br\s*\/?>/);
  });
});
