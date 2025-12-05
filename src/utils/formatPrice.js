/**
 * 숫자를 원화로 천 단위 구분 기호로 변환하는 함수
 * @param {number|string} price - 변환할 가격 (숫자 나 문자열)
 * @returns {string} 포맷된 문자열 반환 (ex: 25000 => "25,000")
 */

export default function formatPrice(price) {
    const numericPrice = typeof price === 'string' ? parseInt(price, 10) : price;

    if (isNaN(numericPrice) || numericPrice === null || numericPrice === undefined) {
        return '가격정보없음';
    }

    return new Intl.NumberFormat('ko-KR').format(numericPrice);
}
