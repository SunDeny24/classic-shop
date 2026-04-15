/**
 * 숫자를 원화로 천 단위 구분 기호로 변환하는 함수
 * @param {number|string} price - 변환할 가격 (숫자 나 문자열)
 * @returns {string} 포맷된 문자열 반환 (ex: 25000 => "25,000")
 */

export default function formatPrice(price: number | string | null | undefined): string {
    const numericPrice = typeof price === 'string' ? parseInt(price, 10) : price;

    // 유효하지 않은 값 처리
    if (numericPrice === null || numericPrice === undefined || isNaN(numericPrice as number)) {
        return '가격정보없음';
    }

    // 음수 처리
    if ((numericPrice as number) < 0) {
        return '0';
    }

    return new Intl.NumberFormat('ko-KR').format(numericPrice as number);
}
