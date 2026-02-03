// 유튜브 컴포넌트 - plyr 사용

// 추후 수정
'use client';

import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useRef } from 'react';

export default function YoutubePlayer({ videoId }) {
    const videoRef = useRef(null);
    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
        const player = new Plyr(videoRef.current, {
            loop: { active: true }, //plyr 반복재생시킴
            controls: ['play', 'mute'], //재생버튼, 뮤트
            youtube: {
                noCookie: false,
                rel: 0, // 추천 영상 제한
                showinfo: 0, // 영상 정보 숨기기
                iv_load_policy: 3, // 주석 숨기기
                loop: 1, //종료시 영상루프 (추천영상 안뜨게 루프돌려줌)
                playlist: videoId, //종료후 루프 위해 list에 같은영상으로 셋팅
                origin: baseUrl,
            },
        });

        //리턴시 destroy로 메서드처리
        return () => {
            if (player) player.destroy();
        };
    }, [videoId]);

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
            <div ref={videoRef} id="player" data-plyr-provider="youtube" data-plyr-embed-id={videoId}></div>
        </div>
    );
}
