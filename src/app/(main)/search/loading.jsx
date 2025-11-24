//검색시 로딩화면구성
// src/app/(main)/search/[query]/loading.jsx

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-48">
            <p>검색 결과를 불러오는 중...</p>
            {/* 스켈레톤, 로딩 애니메이션, 스피너 등을 추가 가능 */}
        </div>
    );
}
