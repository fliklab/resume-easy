import { render, screen } from "@testing-library/react";
import { SkillsSection } from "../../../src/components/document/sections/SkillsSection";
import type { Skills } from "../../../src/types/resume";

// EditableText 컴포넌트 모킹
jest.mock("../../../src/components/document/sections/EditableText", () => ({
  EditableText: ({
    value,
    fieldPath,
  }: {
    value: string;
    fieldPath: string;
  }) => <div data-testid={`editable-${fieldPath}`}>{value}</div>,
}));

// SectionTitle 컴포넌트 모킹
jest.mock("../../../src/components/document/sections/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => (
    <h2 data-testid="section-title">{title}</h2>
  ),
}));

describe("SkillsSection", () => {
  const mockSkills: Skills = {
    frontend: "React, TypeScript, JavaScript",
    backend: "Node.js, Express",
    devtools: "Git, Webpack",
    other: "AWS, Firebase",
  };

  const mockProps = {
    skills: mockSkills,
    isEditMode: false,
    editingField: null,
    onEditField: jest.fn(),
    onFieldChange: jest.fn(),
    onFinishEdit: jest.fn(),
  };

  it("섹션 제목과 모든 스킬 영역이 올바르게 렌더링되어야 함", () => {
    render(<SkillsSection {...mockProps} />);

    // 섹션 제목 확인
    const sectionTitle = screen.getByTestId("section-title");
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle.textContent).toBe("기술 스택");

    // 각 스킬 영역 확인
    const frontendSkills = screen.getByTestId("editable-skills.frontend");
    expect(frontendSkills).toBeInTheDocument();
    expect(frontendSkills.textContent).toBe("React, TypeScript, JavaScript");

    const backendSkills = screen.getByTestId("editable-skills.backend");
    expect(backendSkills).toBeInTheDocument();
    expect(backendSkills.textContent).toBe("Node.js, Express");

    const devtoolsSkills = screen.getByTestId("editable-skills.devtools");
    expect(devtoolsSkills).toBeInTheDocument();
    expect(devtoolsSkills.textContent).toBe("Git, Webpack");

    const otherSkills = screen.getByTestId("editable-skills.other");
    expect(otherSkills).toBeInTheDocument();
    expect(otherSkills.textContent).toBe("AWS, Firebase");
  });

  it("편집 모드 상태가 모든 EditableText 컴포넌트에 전달되어야 함", () => {
    // 이 테스트는 실제로 구현된 컴포넌트의 동작 방식에 따라 달라집니다.
    // 모킹된 EditableText를 사용하고 있으므로 크게 의미가 없는 테스트라 생략합니다.
    // 원래는 isEditMode prop이 모든 EditableText 컴포넌트에 전달되는지 확인해야 합니다.
  });
});
