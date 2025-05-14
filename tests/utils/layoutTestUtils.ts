/**
 * 두 요소 간의 레이아웃 위치를 검증하는 유틸리티 함수
 */
export const expectElementPositioning = (
  element1: HTMLElement,
  element2: HTMLElement,
  position: "above" | "below" | "left" | "right"
) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  switch (position) {
    case "above":
      expect(rect1.bottom).toBeLessThanOrEqual(rect2.top);
      break;
    case "below":
      expect(rect1.top).toBeGreaterThanOrEqual(rect2.bottom);
      break;
    case "left":
      expect(rect1.right).toBeLessThanOrEqual(rect2.left);
      break;
    case "right":
      expect(rect1.left).toBeGreaterThanOrEqual(rect2.right);
      break;
  }
};

/**
 * 요소의 너비 비율을 검증하는 유틸리티 함수
 */
export const expectWidthRatio = (elements: HTMLElement[], ratios: number[]) => {
  const totalWidth = elements.reduce(
    (sum, el) => sum + el.getBoundingClientRect().width,
    0
  );

  elements.forEach((element, index) => {
    const expectedWidth =
      (ratios[index] / ratios.reduce((a, b) => a + b, 0)) * totalWidth;
    const actualWidth = element.getBoundingClientRect().width;

    // 1픽셀 정도의 오차는 허용
    expect(Math.abs(actualWidth - expectedWidth)).toBeLessThanOrEqual(1);
  });
};
