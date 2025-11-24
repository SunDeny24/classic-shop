//product 경로의 로딩중 UI
// src/app/(main)/product/[id]/loading.jsx

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-48">
            <p>상품 상세 결과를 불러오는 중...</p>
            {/* 스켈레톤, 로딩 애니메이션, 스피너 등을 추가 가능 */}
        </div>
    );
}
