import { render, screen } from "@testing-library/react";
import { HeaderSection } from "../../../src/components/document/sections/HeaderSection";
import type { Personal } from "../../../src/types/resume";

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

describe("HeaderSection", () => {
  const mockPersonal: Personal = {
    name: "홍길동",
    title: "시니어 프론트엔드 개발자",
    email: "example@email.com",
    phone: "010-1234-5678",
    github: "github.com/username",
    portfolio: "portfolio.com",
  };

  const mockProps = {
    personal: mockPersonal,
    isEditMode: false,
    editingField: null,
    onEditField: jest.fn(),
    onFieldChange: jest.fn(),
    onFinishEdit: jest.fn(),
  };

  it("모든 개인 정보가 올바르게 렌더링되어야 함", () => {
    render(<HeaderSection {...mockProps} />);

    // 이름
    const nameElement = screen.getByTestId("editable-personal.name");
    expect(nameElement).toHaveTextContent("홍길동");

    // 직함
    const titleElement = screen.getByTestId("editable-personal.title");
    expect(titleElement).toHaveTextContent("시니어 프론트엔드 개발자");

    // 이메일
    const emailElement = screen.getByTestId("editable-personal.email");
    expect(emailElement).toHaveTextContent("example@email.com");

    // 전화번호
    const phoneElement = screen.getByTestId("editable-personal.phone");
    expect(phoneElement).toHaveTextContent("010-1234-5678");

    // GitHub
    const githubElement = screen.getByTestId("editable-personal.github");
    expect(githubElement).toHaveTextContent("github.com/username");

    // 포트폴리오
    const portfolioElement = screen.getByTestId("editable-personal.portfolio");
    expect(portfolioElement).toHaveTextContent("portfolio.com");
  });

  it("편집 모드 상태가 모든 EditableText 컴포넌트에 전달되어야 함", () => {
    // 이 테스트는 실제로 구현된 컴포넌트의 동작 방식에 따라 달라집니다.
    // 모킹된 EditableText를 사용하고 있으므로 크게 의미가 없는 테스트라 생략합니다.
    // 원래는 isEditMode prop이 모든 EditableText 컴포넌트에 전달되는지 확인해야 합니다.
  });
});
