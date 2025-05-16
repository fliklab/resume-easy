import { parseMarkdown } from "../../../src/utils/markdown";

describe("parseMarkdown 함수", () => {
  it("볼드 텍스트를 변환해야 함", () => {
    const input = "이것은 **굵은** 텍스트입니다";
    const expected = "이것은 <strong>굵은</strong> 텍스트입니다";

    expect(parseMarkdown(input)).toContain(expected);
  });

  it("이탤릭 텍스트를 변환해야 함", () => {
    const input = "이것은 *기울임* 텍스트입니다";
    const expected = "이것은 <em>기울임</em> 텍스트입니다";

    expect(parseMarkdown(input)).toContain(expected);
  });

  it("링크를 변환해야 함", () => {
    const input = "이것은 [링크](https://example.com) 텍스트입니다";
    const expected =
      '<a href="https://example.com" class="text-blue-600 hover:underline" target="_blank">링크</a>';

    expect(parseMarkdown(input)).toContain(expected);
  });

  it("하이라이트 텍스트를 변환해야 함", () => {
    const input = "이것은 ==하이라이트== 텍스트입니다";
    const expected = '<span class="bg-yellow-200">하이라이트</span>';

    expect(parseMarkdown(input)).toContain(expected);
  });

  it("복합 마크다운 구문을 올바르게 변환해야 함", () => {
    const input =
      "**굵은** 텍스트와 *기울임*과 [링크](https://example.com)와 ==하이라이트==";
    const result = parseMarkdown(input);

    expect(result).toContain("<strong>굵은</strong>");
    expect(result).toContain("<em>기울임</em>");
    expect(result).toContain('<a href="https://example.com"');
    expect(result).toContain('<span class="bg-yellow-200">하이라이트</span>');
  });

  it("빈 문자열이 입력되면 빈 문자열을 반환해야 함", () => {
    expect(parseMarkdown("")).toBe("");
  });

  it("undefined가 입력되면 빈 문자열을 반환해야 함", () => {
    expect(parseMarkdown(undefined as unknown as string)).toBe("");
  });
});
