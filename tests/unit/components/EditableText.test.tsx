import { fireEvent, render, screen } from "@testing-library/react";
import { EditableText } from "../../../src/components/document/sections/EditableText";

describe("EditableText", () => {
  const mockProps = {
    value: "**굵은** 텍스트와 *기울임* 텍스트",
    fieldPath: "test.field",
    isEditMode: true,
    editingField: null,
    onEdit: jest.fn(),
    onChange: jest.fn(),
    onFinishEdit: jest.fn(),
  };

  it("정상적으로 마크다운이 렌더링되어야 함", () => {
    render(<EditableText {...mockProps} isEditMode={false} />);

    // 마크다운 파싱된 HTML이 있는지 확인
    const element = screen.getByText(/텍스트와 텍스트/, { exact: false });
    expect(element.parentElement?.innerHTML).toContain("<strong>굵은</strong>");
    expect(element.parentElement?.innerHTML).toContain("<em>기울임</em>");
  });

  it("편집 모드일 때 편집 버튼이 표시되어야 함", () => {
    render(<EditableText {...mockProps} />);

    // SVG 아이콘을 포함한 버튼이 존재하는지 확인
    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();
    expect(editButton.querySelector("svg")).toBeInTheDocument();
  });

  it("편집 중일 때 입력 필드가 표시되어야 함", () => {
    render(<EditableText {...mockProps} editingField="test.field" />);

    // 입력 필드가 존재하는지 확인
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("**굵은** 텍스트와 *기울임* 텍스트");
  });

  it("입력 값 변경 시 onChange 함수가 호출되어야 함", () => {
    render(<EditableText {...mockProps} editingField="test.field" />);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "새로운 텍스트" } });

    expect(mockProps.onChange).toHaveBeenCalledWith(
      "test.field",
      "새로운 텍스트"
    );
  });

  it("textarea 타입일 때 여러 줄 입력이 가능해야 함", () => {
    render(
      <EditableText {...mockProps} editingField="test.field" type="textarea" />
    );

    const textareaField = screen.getByRole("textbox");
    expect(textareaField.tagName).toBe("TEXTAREA");
    expect(textareaField).toHaveAttribute("rows", "3");
  });

  it("입력 필드에서 벗어날 때 onFinishEdit 함수가 호출되어야 함", () => {
    render(<EditableText {...mockProps} editingField="test.field" />);

    const inputField = screen.getByRole("textbox");
    fireEvent.blur(inputField);

    expect(mockProps.onFinishEdit).toHaveBeenCalled();
  });
});
