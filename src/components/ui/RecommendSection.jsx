'use client';

import RecentKeywordRecommend from '@/components/ui/RecentKeywordRecommend';
import RecommendedVideos from '@/components/ui/RecommendVideo';
import { useState, useMemo, useEffect } from 'react';

export default function RecommendSection() {
    const [keyword, setKeyword] = useState(null);
    const [msgIndex, setMsgIndex] = useState(0); // 검색어, 트렌드영상 없을 경우 멘트 상태관리
    const [hasVideos, setHasVideos] = useState(true); // 영상 존재 여부 상태

    // 랜덤 멘트 리스트
    const messages = useMemo(
        () => [
            '편하게! 빠르게! 선택할수있는 쇼핑몰 Skipick 입니다.',
            '찾으시는 상품 검색시 관련된 추천영상과 추천템을 보여드려요.',
            '상품 검색시 카테고리와 디테일 옵션을 활용해보세요!',
            '최근 본 상품은 홈화면 하단 리스트에서 언제든 다시 확인할 수 있습니다.',
            '마음에 드는 상품은 하트를 눌러 위시리스트에 담아보세요.',
            'Skipick은 당신의 스마트하고 즐거운 쇼핑 경험을 함께합니다.',
        ],
        [],
    );
    useEffect(() => {
        // 로컬스토리지에서 키워드 가져오기
        const savedSearches = localStorage.getItem('recent_searches');
        const selectedKeyword = savedSearches ? JSON.parse(savedSearches)[0] || '' : '';
        setKeyword(selectedKeyword);

        // 7초마다 멘트 인덱스 변경
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % messages.length); //배열만큼 인터벌 돌려줌
        }, 7000);
        return () => clearInterval(interval); //인터벌 초기화
    }, [messages.length]);

    // 검색어가 없고 + 영상도 없을 때만 멘트 노출
    const showMessage = !keyword && !hasVideos;

    return (
        <div>
            <div className="max-w-screen-xl mx-auto px-5 space-y-5">
                <RecentKeywordRecommend />
                {/* 추천 영상 컴포넌트: 영상이 없으면 내부에서 null을 반환하도록 설정 */}
                <RecommendedVideos onDataEmpty={() => setHasVideos(false)} onDataFull={() => setHasVideos(true)} />

                {/* 검색어, 영상없을때 멘트 노출  */}
                {showMessage && (
                    <div className="w-full py-3 text-center mt-5 overflow-hidden mb-5 ">
                        <p
                            key={msgIndex}
                            className="text-zinc-500 text-2xl font-medium animate-msg-reveal px-6 transition-all"
                        >
                            "{messages[msgIndex]}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
