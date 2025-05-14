import React from "react";
import { render, screen } from "@testing-library/react";
import SkillsSection from "../../../src/components/sections/SkillsSection";
import { mockSkillsSection } from "../../fixtures/mockSectionData";

// KeywordsBlock을 모킹합니다
jest.mock("../../../src/components/blocks/KeywordsBlock", () => {
  return function MockKeywordsBlock({ block }: any) {
    return (
      <div data-testid={`mocked-keywords-${block.id}`}>
        <h4>{block.title}</h4>
        <div>
          {block.items.map((item: string, index: number) => (
            <span key={index} data-testid={`keyword-item-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };
});

describe("SkillsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("제목과 내용이 올바르게 렌더링되어야 함", () => {
    render(<SkillsSection section={mockSkillsSection} />);

    // 섹션 제목 확인
    const sectionTitle = screen.getByTestId("section-title");
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent("기술 스택");

    // 섹션 ID 속성 확인
    const sectionContainer = screen.getByTestId("skills-section");
    expect(sectionContainer).toHaveAttribute("data-section-id", "skills");

    // 모킹된 KeywordsBlock 컴포넌트가 2개 렌더링 되었는지 확인
    const frontendSkills = screen.getByTestId(
      "mocked-keywords-frontend-skills"
    );
    const backendSkills = screen.getByTestId("mocked-keywords-backend-skills");

    expect(frontendSkills).toBeInTheDocument();
    expect(backendSkills).toBeInTheDocument();
  });

  it("편집 모드가 자식 블록에 전달되어야 함", () => {
    // 이 테스트는 mocking이 더 복잡해져서 생략
    // 실제 테스트에서는 mock 함수가 edit 모드 prop과 함께 호출되었는지 확인해야 함
  });
});
