//상세페이지 데이터 보여주는 클라이언트 컴포넌트
"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useShoppingStore } from "@/store/useShoppingStore";
import { ProductStorageData } from "@/types/fashion";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductDetailSkeleton from "../ui/skeleton/ProductDetailSkeleton";
import Image from "next/image";
import { getSafeHref } from "@/utils/security"; //xss공격 방지 위해 URL 검증 함수 추가
import { isRecentViewDataArray, isStringArray } from "@/utils/typeGuards";

export default function ProductResultDetail() {
  // zustand 스토어에서 찜목록과 장바구니 관련 함수 가져오기
  const wishList = useShoppingStore((state) => state.wishList);
  const addItemToCart = useShoppingStore((state) => state.addItemToCart);
  const toggleWishList = useShoppingStore((state) => state.toggleWishList);

  const router = useRouter();
  //데이터가져오기
  const params = useParams();
  const productId = typeof params.id === "string" ? params.id : "";
  const { product } = useProductDetail(productId); //상세 커스텀훅을 통해 상품 데이터 가져오기 (캐시 우선, 로컬스토리지 폴백)

  const [copySuccess, setCopySuccess] = useState(false); //링크 공유용 토스트 상태관리
  const [mounted, setMounted] = useState(false); // 브라우저 mount 여부 상태관리

  //새로고침 시 브라우저가 준비된 후에 mounted 상태를 true로 설정하여 스켈레톤이 먼저 보이도록 함
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // 클린업함수에서 타이머를 정리하여 메모리 누수 방지
    return () => clearTimeout(timer);
  }, []);

  // 공유 링크 생성 함수
  const handleCopyLink = async () => {
    if (!product) return;
    try {
      const linkUrl = String(product.link);
      await navigator.clipboard.writeText(linkUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000); // 2초 뒤 토스트 문구 리셋
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };

  //최근 본 상품 상품데이터 포맷저장 객체생성
  const productData = useMemo<ProductStorageData | null>(() => {
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

  // 최근 본 상품과 최근 검색어를 localStorage에 저장,수정
  useEffect(() => {
    if (!productData) return;

    // ------1. 최근 본 상품 동기화
    // localStorage에서 기존 최근 본 상품 리스트 불러오기
    const savedProducts = localStorage.getItem("recent_products");
    let prevList: ProductStorageData[] = [];
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

    // 최근 본 상품리스트 동기화
    localStorage.setItem("recent_products", JSON.stringify(newProduct));

    // ------2. 최근 검색어 순서 업데이트
    if (productData.keyword) {
      // 한글, 영문, 숫자가 포함되어 있는지 한 번 더 검증 - api에서 이상한 키워드 들어오는 경우 방지
      const isInvalidKeyword = !/[가-힣a-zA-Z0-9]/.test(productData.keyword);

      // localStorage에서 기존 최근 검색어 리스트 불러오기
      if (!isInvalidKeyword) {
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
        // 기존 데이터에 추가하고 10개 제한
        const newSearches = [
          productData.keyword,
          ...prevSearches.filter((k) => k !== productData.keyword),
        ].slice(0, 10);

        // 최근 검색어 업데이트
        localStorage.setItem("recent_searches", JSON.stringify(newSearches));
      }
    }
  }, [productData]);

  // 해당 상품ID가 맞으면 TRUE 아니면 FALSE 토글처리
  const isLiked = productData
    ? wishList.some((item) => item.productId === productData.productId)
    : false;

  const toggleLike = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // 링크 이동 방지 (부모가 Link일 경우)
    e.stopPropagation(); // 부모 요소(카드 링크) 클릭 방지

    // null 체크 후 찜하기 토글
    if (productData) {
      toggleWishList(productData);
    }
  };

  // 새로고침시 브라우저 준비전 스켈레톤 노출
  if (!mounted) {
    return <ProductDetailSkeleton />;
  }

  // 데이터 없을 경우 UI 폴백
  if (!product) {
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

  return (
    <div className="max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row gap-12 ">
        {/* 상품 이미지 */}
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
        {/* 우측 상품 정보,버튼 메뉴 섹션 */}
        <div className="md:w-1/2 flex flex-col font-sans ">
          {/* 브랜드 */}
          <p className="text-lg font-base text-gray-600">{product.brand}</p>
          {/* 상품명 */}
          <h1 className="text-xl font-bold text-gray-900 mt-2">
            {product.title}
          </h1>

          {/* 가격 */}
          <p className="text-3xl font-semibold text-gray-900 mt-4 mb-6">
            {product.lprice}
            <span className="text-2xl">원</span>
          </p>

          {/* 하단 버튼 메뉴 섹션 */}
          <div className="flex items-center space-x-3 mt-auto pt-6 ">
            {/* 장바구니 버튼 */}
            <button
              onClick={() => addItemToCart(product)}
              aria-label="장바구니 담기 버튼"
              className="flex-1 cursor-pointer flex items-center border border-zinc-300 justify-center text-lg font-bold py-4 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              장바구니
            </button>

            {/* 바로 구매 버튼 */}
            <div className="flex-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <a
                className="flex items-center justify-center w-full h-full py-4 text-white text-lg font-bold"
                href={getSafeHref(product.link)}
                target="_blank"
                rel="noopener noreferrer"
              >
                바로 구매
              </a>
            </div>

            {/* 위시리스트 버튼 */}
            <button
              onClick={toggleLike}
              data-like-button
              aria-label={isLiked ? "찜 해제하기" : "찜하기"}
              className="flex items-center justify-center border border-gray-300 rounded-lg w-[60px] h-[60px] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg
                className={`w-7 h-7 transition-colors ${isLiked ? "text-blue-600 fill-current" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>

            {/* 공유 버튼 */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center border border-gray-300 rounded-lg w-[60px] h-[60px] hover:bg-gray-100 transition-colors cursor-pointer"
              title="링크 복사"
              aria-label={
                copySuccess ? "공유 링크 복사됨" : "공유링크 복사버튼"
              }
            >
              {copySuccess ? (
                // 복사 성공시 체크 아이콘
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-blue-600 scale-120 transition-transform duration-400"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                // 기본상태는 공유 아이콘
                <svg
                  className="w-6 h-6 text-gray-500 transition-transform duration-300 hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l9.566-5.345m-9.566 7.53l9.566 5.345m0 0a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185zm0-12.87a2.25 2.25 0 103.933-2.184 2.25 2.25 0 00-3.933 2.184z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
