// 추천영상 컴포넌트 - 어떤영상을 가져올지 결정
// src/components/ui/RecommendVideo.jsx

// 추후 수정
'use client';

import { useState, useEffect } from 'react';
import YoutubePlayer from './YoutubePlayer';
import { useYoutube } from '@/hooks/useYoutube';

export default function RecommendedVideos() {
    const [keyword, setKeyword] = useState(null);
    useEffect(() => {
        // 클라이언트 사이드에서만 실행됨
        const savedSearches = localStorage.getItem('recent_searches'); //최근 검색어
        if (savedSearches) {
            try {
                const parseList = JSON.parse(savedSearches);

                if (Array.isArray(parseList) && parseList.length > 0) {
                    // const randomIndex = Math.floor(Math.random() * searchList.length);
                    // const selectedKeyword = searchList[randomIndex];

                    setKeyword(parseList[0]);
                }
            } catch (e) {
                console.log('로컬스토리지 데이터 파싱 에러', e);
            }
        } else {
            setKeyword('');
        }
    }, []);

    // 검색어가 있으면 search 모드, 없으면 trend 모드
    //keyword가 null이면 null로 훅호출하지않음, 있다면 검색어있으니까 search모드로, 아니면 trend모드로
    const type = keyword === null ? null : keyword ? 'search' : 'trend';

    const { videos, loading, error } = useYoutube(type, keyword);

    if (loading) return <div>추천 영상 로딩 중...</div>;
    if (error) return <div>영상을 불러올 수 없습니다.</div>;

    return (
        <section className="my-10">
            <h2 className="text-xl mb-8 font-medium text-zinc-800">
                {keyword ? (
                    <>
                        <span className="text-blue-700 text-2xl">{keyword}</span>{' '}
                        <span>키워드와 연결되는 영상 콘텐츠를 추천드려요.</span>
                    </>
                ) : (
                    '지금 뜨는 트렌드 영상 확인해볼까요?'
                )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(videos) && videos.length > 0
                    ? videos.map((video) => (
                          <div key={video.id}>
                              {/* 여기에 Plyr 플레이어 컴포넌트 삽입 */}
                              <YoutubePlayer videoId={video.id} />
                              <p className="mt-2 text-sm font-medium">{video.title}</p>
                          </div>
                      ))
                    : !loading && <p>불러올 영상이 없음</p>}
            </div>
        </section>
    );
}
