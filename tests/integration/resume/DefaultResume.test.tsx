import { render, screen, fireEvent } from "@testing-library/react";
import DefaultResume from "../../../src/pages/DefaultResume";
import { initialResumeData } from "../../../src/data/initialResumeData";
import type { Personal, Skills } from "../../../src/types/resume";

// 섹션 컴포넌트들을 모킹
jest.mock("../../../src/components/document/sections/HeaderSection", () => ({
  HeaderSection: ({
    personal,
    isEditMode,
  }: {
    personal: Personal;
    isEditMode: boolean;
  }) => (
    <div data-testid="header-section">
      <div data-testid="header-name">{personal.name}</div>
      <div data-testid="header-title">{personal.title}</div>
      <div data-testid="header-is-edit-mode">{String(isEditMode)}</div>
    </div>
  ),
}));

jest.mock("../../../src/components/document/sections/SummarySection", () => ({
  SummarySection: ({
    summary,
    isEditMode,
  }: {
    summary: string;
    isEditMode: boolean;
  }) => (
    <div data-testid="summary-section">
      <div data-testid="summary-content">{summary}</div>
      <div data-testid="summary-is-edit-mode">{String(isEditMode)}</div>
    </div>
  ),
}));

jest.mock("../../../src/components/document/sections/SkillsSection", () => ({
  SkillsSection: ({
    skills,
    isEditMode,
  }: {
    skills: Skills;
    isEditMode: boolean;
  }) => (
    <div data-testid="skills-section">
      <div data-testid="skills-frontend">{skills.frontend}</div>
      <div data-testid="skills-is-edit-mode">{String(isEditMode)}</div>
    </div>
  ),
}));

// 다른 섹션들도 필요에 따라 모킹

describe("DefaultResume", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기 상태에서는 편집 모드가 아니어야 함", () => {
    render(<DefaultResume />);

    const headerIsEditMode = screen.getByTestId("header-is-edit-mode");
    const summaryIsEditMode = screen.getByTestId("summary-is-edit-mode");
    const skillsIsEditMode = screen.getByTestId("skills-is-edit-mode");

    expect(headerIsEditMode).toHaveTextContent("false");
    expect(summaryIsEditMode).toHaveTextContent("false");
    expect(skillsIsEditMode).toHaveTextContent("false");
  });

  it("편집 모드 버튼 클릭 시 모든 섹션의 편집 모드가 활성화되어야 함", () => {
    render(<DefaultResume />);

    // 편집 모드 버튼 찾기
    const editButton = screen.getByText("편집 모드");
    fireEvent.click(editButton);

    const headerIsEditMode = screen.getByTestId("header-is-edit-mode");
    const summaryIsEditMode = screen.getByTestId("summary-is-edit-mode");
    const skillsIsEditMode = screen.getByTestId("skills-is-edit-mode");

    expect(headerIsEditMode).toHaveTextContent("true");
    expect(summaryIsEditMode).toHaveTextContent("true");
    expect(skillsIsEditMode).toHaveTextContent("true");
  });

  it("초기 데이터가 올바르게 전달되어야 함", () => {
    render(<DefaultResume />);

    const headerName = screen.getByTestId("header-name");
    const headerTitle = screen.getByTestId("header-title");
    const summaryContent = screen.getByTestId("summary-content");
    const skillsFrontend = screen.getByTestId("skills-frontend");

    expect(headerName).toHaveTextContent(initialResumeData.personal.name);
    expect(headerTitle).toHaveTextContent(initialResumeData.personal.title);
    expect(summaryContent).toHaveTextContent(initialResumeData.summary);
    expect(skillsFrontend).toHaveTextContent(initialResumeData.skills.frontend);
  });
});
