// 추천영상 컴포넌트 - 어떤영상을 가져올지 결정
// src/components/ui/RecommendVideo.jsx

'use client';

import dynamic from 'next/dynamic';

const YoutubePlayer = dynamic(() => import('./YoutubePlayer'), {
    ssr: false,
    loading: () => <div className="aspect-video bg-gray-200 animate-pulse rounded-xl" />,
});
import RecommendVideoSkeleton from './skeleton/RecommendVideoSkeleton';

export default function RecommendedVideos({ videos, loading, error, keyword }) {
    // 로딩중일때 스켈레톤
    if (loading) return <RecommendVideoSkeleton />;

    //에러거나 데이터 없을 경우엔 멘트 노출
    if (error || !videos || !videos.length) return null;

    return (
        <section className="w-full">
            <h2 className="text-lg sm:text-xl mb-6 font-medium text-zinc-800">
                {keyword ? (
                    <>
                        <span className="text-blue-700 text-xl sm:text-2xl font-bold"># {keyword}</span>{' '}
                        <span> 관련 추천 영상 </span>
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
