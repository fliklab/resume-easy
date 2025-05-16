import { render, screen, fireEvent } from "@testing-library/react";
import DefaultResume from "../../../src/pages/DefaultResume";
import { initialResumeData } from "../../../src/data/initialResumeData";
import type {
  Education,
  Experience,
  Personal,
  Project,
} from "../../../src/types/resume";

type HeaderSectionProps = {
  personal: Personal;
  isEditMode: boolean;
};

type SummarySectionProps = {
  summary: string;
  isEditMode: boolean;
};

type SkillsSectionProps = {
  skills: {
    frontend: string;
    backend: string;
    devtools: string;
    other: string;
  };
  isEditMode: boolean;
};

type ExperienceSectionProps = {
  experiences: Experience[];
  isEditMode: boolean;
};

type ProjectsSectionProps = {
  projects: Project[];
  isEditMode: boolean;
};

type EducationSectionProps = {
  education: Education;
  isEditMode: boolean;
};

type CertificationsSectionProps = {
  certifications: string[];
  isEditMode: boolean;
};

// 모든 섹션 컴포넌트를 모킹
jest.mock("../../../src/components/document/sections", () => ({
  HeaderSection: ({ personal, isEditMode }: HeaderSectionProps) => (
    <header data-testid="header-section">
      <div data-testid="header-name">{personal.name}</div>
      <div data-testid="header-edit-mode">{String(isEditMode)}</div>
    </header>
  ),
  SummarySection: ({ summary, isEditMode }: SummarySectionProps) => (
    <section data-testid="summary-section">
      <div data-testid="summary-content">{summary}</div>
      <div data-testid="summary-edit-mode">{String(isEditMode)}</div>
    </section>
  ),
  SkillsSection: ({ skills, isEditMode }: SkillsSectionProps) => (
    <section data-testid="skills-section">
      <div data-testid="skills-frontend">{skills.frontend}</div>
      <div data-testid="skills-edit-mode">{String(isEditMode)}</div>
    </section>
  ),
  ExperienceSection: ({ experiences, isEditMode }: ExperienceSectionProps) => (
    <section data-testid="experience-section">
      <div data-testid="experience-company">{experiences[0].company}</div>
      <div data-testid="experience-edit-mode">{String(isEditMode)}</div>
    </section>
  ),
  ProjectsSection: ({ projects, isEditMode }: ProjectsSectionProps) => (
    <section data-testid="projects-section">
      <div data-testid="project-name">{projects[0].name}</div>
      <div data-testid="projects-edit-mode">{String(isEditMode)}</div>
    </section>
  ),
  EducationSection: ({ education, isEditMode }: EducationSectionProps) => (
    <section data-testid="education-section">
      <div data-testid="education-degree">{education.degree}</div>
      <div data-testid="education-edit-mode">{String(isEditMode)}</div>
    </section>
  ),
  CertificationsSection: ({
    certifications,
    isEditMode,
  }: CertificationsSectionProps) => (
    <section data-testid="certifications-section">
      <div data-testid="certification-item">{certifications[0]}</div>
      <div data-testid="certifications-edit-mode">{String(isEditMode)}</div>
    </section>
  ),
}));

describe("DefaultResume 통합 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 섹션이 올바르게 렌더링되어야 함", () => {
    render(<DefaultResume />);

    // 모든 섹션이 렌더링되었는지 확인
    expect(screen.getByTestId("header-section")).toBeInTheDocument();
    expect(screen.getByTestId("summary-section")).toBeInTheDocument();
    expect(screen.getByTestId("skills-section")).toBeInTheDocument();
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
    expect(screen.getByTestId("projects-section")).toBeInTheDocument();
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
    expect(screen.getByTestId("certifications-section")).toBeInTheDocument();
  });

  it("초기 데이터가 모든 섹션에 올바르게 전달되어야 함", () => {
    render(<DefaultResume />);

    // 각 섹션에 데이터가 올바르게 전달되었는지 확인
    expect(screen.getByTestId("header-name").textContent).toBe(
      initialResumeData.personal.name
    );
    expect(screen.getByTestId("summary-content").textContent).toBe(
      initialResumeData.summary
    );
    expect(screen.getByTestId("skills-frontend").textContent).toBe(
      initialResumeData.skills.frontend
    );
    expect(screen.getByTestId("experience-company").textContent).toBe(
      initialResumeData.experiences[0].company
    );
    expect(screen.getByTestId("project-name").textContent).toBe(
      initialResumeData.projects[0].name
    );
    expect(screen.getByTestId("education-degree").textContent).toBe(
      initialResumeData.education.degree
    );
    expect(screen.getByTestId("certification-item").textContent).toBe(
      initialResumeData.certifications[0]
    );
  });

  it("편집 모드 버튼 클릭 시 모든 섹션의 편집 상태가 변경되어야 함", () => {
    render(<DefaultResume />);

    // 초기 상태에서는 모든 섹션이 편집 모드가 아니어야 함
    expect(screen.getByTestId("header-edit-mode").textContent).toBe("false");
    expect(screen.getByTestId("summary-edit-mode").textContent).toBe("false");
    expect(screen.getByTestId("skills-edit-mode").textContent).toBe("false");
    expect(screen.getByTestId("experience-edit-mode").textContent).toBe(
      "false"
    );
    expect(screen.getByTestId("projects-edit-mode").textContent).toBe("false");
    expect(screen.getByTestId("education-edit-mode").textContent).toBe("false");
    expect(screen.getByTestId("certifications-edit-mode").textContent).toBe(
      "false"
    );

    // 편집 모드 버튼 클릭
    const editButton = screen.getByText("편집 모드");
    fireEvent.click(editButton);

    // 모든 섹션이 편집 모드로 변경되어야 함
    expect(screen.getByTestId("header-edit-mode").textContent).toBe("true");
    expect(screen.getByTestId("summary-edit-mode").textContent).toBe("true");
    expect(screen.getByTestId("skills-edit-mode").textContent).toBe("true");
    expect(screen.getByTestId("experience-edit-mode").textContent).toBe("true");
    expect(screen.getByTestId("projects-edit-mode").textContent).toBe("true");
    expect(screen.getByTestId("education-edit-mode").textContent).toBe("true");
    expect(screen.getByTestId("certifications-edit-mode").textContent).toBe(
      "true"
    );
  });
});
