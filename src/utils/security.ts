/**
 * 렌더링될 외부 URL의 안정성을 검증하는 헬퍼 함수
 * javascript:, vbscript:, data: 등의 스키마를 사용한 XSS 공격을 무력화시킵니다.
 */
export function getSafeHref(url: string | undefined | null): string {
  if (!url) return "#";

  const trimmed = url.trim();

  // javascript:, vbscript:, data: 스키마 차단
  if (/^(javascript|vbscript|data):/i.test(trimmed)) {
    console.warn(`보안 위협이 감지된 URL이 차단되었습니다: ${trimmed}`);
    return "#";
  }

  // 프로토콜이 온전한 HTTP/HTTPS 형태 혹은 상대 경로인지 검증
  if (/^(https?:\/\/|\/)/i.test(trimmed)) {
    return trimmed;
  }

  return "#";
}
