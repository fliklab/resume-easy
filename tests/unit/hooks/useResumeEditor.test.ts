import { renderHook, act } from "@testing-library/react";
import { useResumeEditor } from "../../../src/hooks/useResumeEditor";
import type { ResumeData } from "../../../src/types/resume";

describe("useResumeEditor 훅", () => {
  const mockInitialData: ResumeData = {
    personal: {
      name: "테스트 이름",
      title: "테스트 직함",
      email: "test@example.com",
      phone: "010-1234-5678",
      github: "github.com/test",
      portfolio: "test.com",
    },
    summary: "테스트 요약",
    skills: {
      frontend: "React, TypeScript",
      backend: "Node.js",
      devtools: "Git",
      other: "AWS",
    },
    experiences: [
      {
        company: "테스트 회사",
        title: "테스트 직무",
        location: "서울",
        period: "2020-2022",
        achievements: ["테스트 성과 1", "테스트 성과 2"],
      },
    ],
    projects: [
      {
        name: "테스트 프로젝트",
        tech: "React",
        description: "테스트 설명",
        link: "github.com/test/project",
      },
    ],
    education: {
      degree: "테스트 학위",
      institution: "테스트 대학",
      period: "2015-2019",
    },
    certifications: ["테스트 자격증"],
  };

  it("초기 상태가 올바르게 설정되어야 함", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    expect(result.current.resumeData).toEqual(mockInitialData);
    expect(result.current.isEditMode).toBe(false);
    expect(result.current.editingField).toBe(null);
  });

  it("편집 모드 토글이 올바르게 작동해야 함", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 초기 상태는 편집 모드가 아님
    expect(result.current.isEditMode).toBe(false);

    // 편집 모드로 전환
    act(() => {
      result.current.toggleEditMode();
    });
    expect(result.current.isEditMode).toBe(true);

    // 편집 중이던 필드가 있다면 초기화되어야 함
    act(() => {
      result.current.handleEditField("test.field");
    });
    expect(result.current.editingField).toBe("test.field");

    // 편집 모드를 다시 토글하면 편집 중이던 필드가 초기화되어야 함
    act(() => {
      result.current.toggleEditMode();
    });
    expect(result.current.isEditMode).toBe(false);
    expect(result.current.editingField).toBe(null);
  });

  it("필드 값 변경이 올바르게 작동해야 함 - 일반 필드", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 요약 필드 변경
    act(() => {
      result.current.handleFieldChange("summary", "새로운 요약");
    });
    expect(result.current.resumeData.summary).toBe("새로운 요약");
  });

  it("필드 값 변경이 올바르게 작동해야 함 - 중첩 객체 필드", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 개인 정보의 이름 필드 변경
    act(() => {
      result.current.handleFieldChange("personal.name", "새 이름");
    });
    expect(result.current.resumeData.personal.name).toBe("새 이름");

    // 스킬의 프론트엔드 필드 변경
    act(() => {
      result.current.handleFieldChange("skills.frontend", "React, Vue");
    });
    expect(result.current.resumeData.skills.frontend).toBe("React, Vue");
  });

  it("필드 값 변경이 올바르게 작동해야 함 - 배열 필드", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 자격증 배열의 첫 번째 항목 변경
    act(() => {
      result.current.handleFieldChange("certifications.0", "새 자격증");
    });
    expect(result.current.resumeData.certifications[0]).toBe("새 자격증");
  });

  it("필드 값 변경이 올바르게 작동해야 함 - 경험 배열 내 객체 필드", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 경험 배열의 첫 번째 항목의 회사 필드 변경
    act(() => {
      result.current.handleFieldChange("experiences.0.company", "새 회사");
    });
    expect(result.current.resumeData.experiences[0].company).toBe("새 회사");
  });

  it("필드 값 변경이 올바르게 작동해야 함 - 경험 배열 내 성과 배열 항목", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 경험 배열의 첫 번째 항목의 성과 배열의 첫 번째 항목 변경
    act(() => {
      result.current.handleFieldChange(
        "experiences.0.achievements.0",
        "새 성과"
      );
    });
    expect(result.current.resumeData.experiences[0].achievements[0]).toBe(
      "새 성과"
    );
  });

  it("handleFinishEdit이 editingField를 null로 설정해야 함", () => {
    const { result } = renderHook(() => useResumeEditor(mockInitialData));

    // 편집 중인 필드 설정
    act(() => {
      result.current.handleEditField("test.field");
    });
    expect(result.current.editingField).toBe("test.field");

    // 편집 완료
    act(() => {
      result.current.handleFinishEdit();
    });
    expect(result.current.editingField).toBe(null);
  });
});
