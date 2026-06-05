//상세페이지 데이터 보여주는 클라이언트 컴포넌트
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useShoppingStore } from "@/store/useShoppingStore";
import { CuratedProduct, RecentViewData } from "@/types/fashion";
import Image from "next/image";
import { getSafeHref } from "@/utils/security"; //xss공격 방지 위해 URL 검증 함수 추가
import {
  isCuratedProduct,
  isRecentViewDataArray,
  isStringArray,
} from "@/utils/typeGuards";

export default function ProductResultDetail() {
  const wishList = useShoppingStore((state) => state.wishList);
  const addItemToCart = useShoppingStore((state) => state.addItemToCart);
  const toggleWishList = useShoppingStore((state) => state.toggleWishList);
  const searchParams = useSearchParams();
  const router = useRouter();

  //상품
  const [product, setProduct] = useState<CuratedProduct | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //렌더시 서버와 결과값 맞추기 위해 useEffect내에서 마운트시 searchParams 사용
  useEffect(() => {
    setMounted(true);
    const dataParams = searchParams.get("data");
    if (!dataParams) {
      setError(true);
      return;
    }
    try {
      const decodeData = decodeURIComponent(dataParams);
      const parsedData = JSON.parse(decodeData);
      if (!isCuratedProduct(parsedData)) {
        //CuratedProduct 타입구조에 맞는지 런타임 검증 추가
        throw new Error("Invalid Products data format");
      }
      setProduct(parsedData);
    } catch (e) {
      console.error("상품 데이터 파싱 실패 :", e);
      setError(true);
    }
  }, [searchParams]);

  //최근 본 상품 상품데이터 포맷저장 객체생성
  const productData = useMemo<RecentViewData | null>(() => {
    if (!product) return null;
    return {
      productId: product.productId,
      brand: product.brand,
      title: product.title,
      image: product.image,
      lprice: product.lprice,
      link: product.link,
      rawPrice: product.rawPrice,
      keyword: product.keyword,
    };
  }, [product]);

  useEffect(() => {
    if (!productData) return;

    // 1. 최근 본 상품에 상세페이지 들어갔던 이력 저장
    const savedProducts = localStorage.getItem("recent_products");
    let prevList: RecentViewData[] = [];
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (isRecentViewDataArray(parsed)) {
          prevList = parsed;
        }
      } catch {
        // parsing error fallback
      }
    }
    // 기존 데이터에 추가하고 5개 제한함
    const newProduct = [
      productData,
      ...prevList.filter((item) => item.productId !== productData.productId),
    ].slice(0, 5);

    localStorage.setItem("recent_products", JSON.stringify(newProduct));

    // 2. 최근 검색어 순서 업데이트
    if (productData.keyword) {
      const savedSearches = localStorage.getItem("recent_searches");
      let prevSearches: string[] = [];
      if (savedSearches) {
        try {
          const parsed = JSON.parse(savedSearches);
          if (isStringArray(parsed)) {
            prevSearches = parsed;
          }
        } catch {
          // parsing error fallback
        }
      }
      const newSearches = [
        productData.keyword,
        ...prevSearches.filter((k) => k !== productData.keyword),
      ].slice(0, 10);
      localStorage.setItem("recent_searches", JSON.stringify(newSearches));
    }
  }, [productData]);

  // 해당 상품ID가 맞으면 TRUE 아니면 FALSE 토글처리
  const isLiked = productData
    ? wishList.some((item) => item.productId === productData.productId)
    : false;

  const toggleLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 링크 이동 방지 (부모가 Link일 경우)
    e.stopPropagation(); // 부모 요소(카드 링크) 클릭 방지

    // null 체크 후 찜하기 토글(타입 지정 추후 다시 확인)
    if (productData) {
      toggleWishList(productData as CuratedProduct);
    }
  };

  if (error) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold">상품 정보를 찾을 수 없습니다.</h2>
        <p className="text-gray-500 mt-2 mb-6">
          이미 삭제되었거나 잘못된 접근입니다.
        </p>
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full font-semibold hover:bg-zinc-700 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  if (!mounted || !product) {
    return (
      <div className="p-20 text-center">상품 정보를 불러오는 중입니다...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
            width={600}
            height={600}
            priority
          />
        </div>

        <div className="md:w-1/2 flex flex-col font-sans">
          <p className="text-lg font-base text-gray-600">{product.brand}</p>
          <h1 className="text-xl font-bold text-gray-900 mt-2">
            {product.title}
          </h1>
          <p className="text-3xl font-semibold text-gray-900 mt-4 mb-6">
            {product.lprice}
            <span className="text-2xl">원</span>
          </p>

          <div className="flex items-center space-x-4 mt-auto pt-6 ">
            <div
              onClick={() => addItemToCart(product)}
              className="flex-1 cursor-pointer flex items-center border border-zinc-300 justify-center text-lg font-bold py-4 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              장바구니
            </div>
            <div className="flex-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <a
                className="flex items-center justify-center w-full h-full py-4 text-white text-lg font-bold"
                href={getSafeHref(product.link)}
                target="_blank"
                rel="noopener noreferrer" //새 탭에서 열 때 보안 강화
              >
                바로 구매
              </a>
            </div>
            <div
              onClick={toggleLike}
              data-like-button
              className="flex items-center justify-center border border-gray-300 rounded-lg w-[60px] h-[60px] hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-7 h-7  transition-colors  ${isLiked ? "text-blue-600 fill-current" : "text-gray-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
