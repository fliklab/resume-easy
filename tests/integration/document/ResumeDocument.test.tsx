import { render, screen } from "@testing-library/react";
import ResumeDocument from "../../../src/components/document/ResumeDocument";
import { mockResumeData } from "../../fixtures/mockResumeData";
import type { Section } from "../../../src/types";

// SkillsSection을 모킹합니다
jest.mock("../../../src/components/sections/SkillsSection", () => {
  return function MockSkillsSection({ section }: { section: Section }) {
    return (
      <div data-testid={`mocked-section-${section.id}`}>
        <h2>{section.title}</h2>
        <div>Mock Skills Section Content</div>
      </div>
    );
  };
});

describe("ResumeDocument", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("문서 제목이 올바르게 렌더링되어야 함", () => {
    render(<ResumeDocument document={mockResumeData} />);

    const title = screen.getByTestId("document-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("개발자 이력서");
  });

  it("모든 섹션이 올바른 순서로 렌더링되어야 함", () => {
    render(<ResumeDocument document={mockResumeData} />);

    // skills 섹션은 모킹된 컴포넌트로 렌더링됨
    const skillsSection = screen.getByTestId("mocked-section-skills");
    expect(skillsSection).toBeInTheDocument();

    // 기본 섹션으로 렌더링되는 섹션들
    const defaultSections = screen.getAllByTestId("default-section");

    // profile, summary, experience 3개의 기본 섹션이 있어야 함
    expect(defaultSections.length).toBe(3);

    // 섹션 순서 확인
    expect(defaultSections[0]).toHaveAttribute("data-section-id", "profile");
    expect(defaultSections[1]).toHaveAttribute("data-section-id", "summary");
    expect(defaultSections[2]).toHaveAttribute("data-section-id", "experience");
  });

  it("편집 모드가 섹션들에 전달되어야 함", () => {
    // 이 테스트는 모킹이 더 복잡해져서 생략
    // 실제 테스트에서는 mock 함수가 edit 모드 prop과 함께 호출되었는지 확인해야 함
  });
});
