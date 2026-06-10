// src/components/ui/skeleton/ProductDetailSkeleton.tsx
"use client";

export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto bg-white p-5 md:p-10 animate-pulse">
      <div className="flex flex-col md:flex-row gap-12">
        {/* 왼쪽: 상품 이미지 스켈레톤 */}
        <div className="md:w-1/2">
          <div className="w-full aspect-square bg-zinc-200 rounded-lg shadow-md" />
        </div>

        {/* 오른쪽: 메타데이터 및 버튼 스켈레톤 */}
        <div className="md:w-1/2 flex flex-col justify-between py-2">
          <div>
            {/* 브랜드명 라인 */}
            <div className="h-6 bg-zinc-200 rounded w-1/4 mb-4" />
            {/* 상품 타이틀 라인 */}
            <div className="h-8 bg-zinc-200 rounded w-3/4 mb-2" />
            <div className="h-8 bg-zinc-200 rounded w-1/2 mb-6" />
            {/* 가격 라인 */}
            <div className="h-10 bg-zinc-200 rounded w-1/3 mb-8" />
          </div>

          {/* 하단 버튼 그룹 스켈레톤 */}
          <div className="flex items-center space-x-4 pt-6 mt-auto">
            {/* 장바구니 버튼 */}
            <div className="flex-1 h-14 bg-zinc-200 rounded-lg" />
            {/* 바로구매 버튼 */}
            <div className="flex-1 h-14 bg-zinc-200 rounded-lg" />
            {/* 찜하기 버튼 */}
            <div className="w-[60px] h-[60px] bg-zinc-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
