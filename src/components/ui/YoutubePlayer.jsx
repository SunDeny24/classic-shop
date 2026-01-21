// 유튜브 컴포넌트 - plyr 사용

// 추후 수정 'use client';

export default function YoutubePlayer({ videoId }) {
    // videoId가 없을 경우
    if (!videoId) {
        return (
            <div className="w-full aspect-video bg-gray-100 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400">
                재생할 영상 ID가 없습니다.
            </div>
        );
    }

    return (
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
}
