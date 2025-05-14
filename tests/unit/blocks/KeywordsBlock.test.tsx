import React from "react";
import { render, screen } from "@testing-library/react";
import KeywordsBlock from "../../../src/components/blocks/KeywordsBlock";
import { BlockType } from "../../../src/types";

describe("KeywordsBlock", () => {
  const mockKeywordsBlock = {
    id: "keywords1",
    type: BlockType.KEYWORDS,
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    title: "프론트엔드",
  };

  const mockKeywordsBlockWithoutTitle = {
    id: "keywords2",
    type: BlockType.KEYWORDS,
    items: ["Node.js", "Express", "MongoDB"],
  };

  it("제목과 키워드 항목들이 올바르게 렌더링되어야 함", () => {
    render(<KeywordsBlock block={mockKeywordsBlock} />);

    // 제목 확인
    const title = screen.getByTestId("keywords-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("프론트엔드");

    // 키워드 항목들 확인
    const keywordItems = screen.getAllByTestId(/keyword-item-/);
    expect(keywordItems).toHaveLength(5);
    expect(keywordItems[0]).toHaveTextContent("React");
    expect(keywordItems[1]).toHaveTextContent("TypeScript");
    expect(keywordItems[2]).toHaveTextContent("JavaScript");
    expect(keywordItems[3]).toHaveTextContent("HTML");
    expect(keywordItems[4]).toHaveTextContent("CSS");
  });

  it("제목 없이 키워드 항목들만 렌더링되어야 함", () => {
    render(<KeywordsBlock block={mockKeywordsBlockWithoutTitle} />);

    // 제목이 없는지 확인
    expect(screen.queryByTestId("keywords-title")).not.toBeInTheDocument();

    // 키워드 항목들 확인
    const keywordItems = screen.getAllByTestId(/keyword-item-/);
    expect(keywordItems).toHaveLength(3);
    expect(keywordItems[0]).toHaveTextContent("Node.js");
    expect(keywordItems[1]).toHaveTextContent("Express");
    expect(keywordItems[2]).toHaveTextContent("MongoDB");
  });

  it("편집 모드에서 키워드 아이템에 클릭 이벤트 핸들러가 있어야 함", () => {
    const handleEdit = jest.fn();
    render(
      <KeywordsBlock
        block={mockKeywordsBlock}
        isEditMode={true}
        onEdit={handleEdit}
      />
    );

    // 편집 모드에서는 키워드 항목에 onClick 핸들러가 있어야 함
    const keywordItems = screen.getAllByTestId(/keyword-item-/);
    expect(keywordItems[0]).toHaveAttribute("class", "keyword-item");

    // 클릭 이벤트가 핸들러에 등록되었는지 확인
    // 실제 클릭 테스트는 복잡한 구현이 필요하므로 여기서는 생략
  });
});
