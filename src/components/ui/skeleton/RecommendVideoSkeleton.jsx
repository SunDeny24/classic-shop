// src/app/components/ui/skeleton/YoutubeSkeleton.jsx
export default function YoutubeSkeleton() {
    return (
        <div className="w-full ">
            {/* 제목 스켈레톤 */}
            <div className="text-xl mb-6 font-medium text-stone-600">추천 영상 로딩 중...</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            {/* 비디오 본체 스켈레톤 */}
                            <div className="w-full aspect-video rounded-xl bg-gray-200 animate-pulse shadow-sm" />

                            {/* 하단 텍스트 정보 스켈레톤 */}
                            <div className="space-y-1 ">
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
