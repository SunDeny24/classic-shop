// src/components/ui/skeleton/ProductCardSkeleton

export default function ProductCardSkeleton() {
    return (
        <div className="bg-white overflow-hidden animate-pulse">
            {/* 이미지 영역 스켈레톤 */}
            <div className="w-full aspect-[3/4] bg-zinc-200" />

            <div className="pt-5 pb-8 px-1">
                {/* 브랜드 텍스트 스켈레톤 */}
                <div className="h-[12px] bg-zinc-200  mb-1 w-1/4 rounded-sm" />

                {/* 제목 텍스트 스켈레톤 */}
                <div className="space-y-1">
                    <div className="h-[15px] bg-zinc-200 w-full rounded-sm" />
                    <div className="h-[15px] bg-zinc-200 w-full rounded-sm" />
                </div>

                {/* 가격 텍스트 스켈레톤 */}
                <div className="h-[20px] bg-zinc-200 w-1/3 mt-1 rounded-sm" />
            </div>
        </div>
    );
}
