// Jest 설정 파일
require("@testing-library/jest-dom");

// 필요한 경우 추가 설정이나 모킹 코드를 여기에 추가

// 레이아웃 테스트를 위한 브라우저 환경 보강
window.HTMLElement.prototype.getBoundingClientRect = function () {
  // 테스트 환경에서 getBoundingClientRect 모킹
  // 실제 값은 테스트에서 필요에 따라 오버라이드 가능
  return {
    width: 120,
    height: 120,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  };
};
