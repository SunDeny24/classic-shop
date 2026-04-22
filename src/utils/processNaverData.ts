/**
 *  네이버 쇼핑 API 응답 데이터 가공 *
 *  @param {FashionProduct[]} items - 네이버 쇼핑 API에서 반환된 상품 배열. 각 상품은 FashionProduct 타입입니다.
 *  @param {string} keyword - 검색 키워드. 가공된 상품에 키워드를 추가합니다.
 *  @returns {CuratedProduct[]} - 가공된 상품 배열. 중복이 제거되고 최저가 정보가 포함된 CuratedProduct 타입의 배열입니다.
 */
import formatPrice from "@/utils/formatPrice";
import { CuratedProduct, FashionProduct } from "@/types/fashion";

export default function processNaverData(
  items: FashionProduct[],
  keyword: string,
) {
  const curatedProductMap = new Map<string, CuratedProduct>();

  items.forEach((item) => {
    const key = item.productId; //키는 네이버의 productId
    const currentPrice = parseInt(item.lprice, 10); //최저가 10진수 변환

    //상품ID없거나, 가격유효하지않은 경우, 상품이름, 상품이미지가 없는 경우 검증
    if (!key || isNaN(currentPrice) || !item.title || !item.image) {
      return;
    }
    //title <b>태그제거
    const cleanTitle = item.title.replace(/<b>/g, "").replace(/<\/b>/g, "");

    //대표상품으로 묶기
    if (!curatedProductMap.has(key)) {
      curatedProductMap.set(key, {
        productId: key,
        title: cleanTitle,
        image: item.image,
        brand: item.brand || item.mallName || "알수없음",
        link: item.link,
        lprice: formatPrice(currentPrice),
        rawPrice: currentPrice,
        productType: item.productType,
        mallName: item.mallName,
        keyword: keyword,
        category1: item.category1,
        category2: item.category2,
        category3: item.category3,
        category4: item.category4,
      });
    } else {
      //기존상품의 최저가 셋팅
      const existProduct = curatedProductMap.get(key);
      //현재최저가< 기존최저가 일시 더 낮은 가격으로 변경
      if (existProduct && currentPrice < existProduct.rawPrice) {
        existProduct.lprice = formatPrice(currentPrice); //더 낮은 가격의 현재최저가로 변경
        existProduct.rawPrice = currentPrice;
        existProduct.link = item.link;
        existProduct.mallName = item.mallName;
      }
    }
  });
  return Array.from(curatedProductMap.values());
}
