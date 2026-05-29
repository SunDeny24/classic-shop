// 유튜브 컴포넌트 - plyr 사용

"use client";
import "plyr/dist/plyr.css";
import { useEffect, useRef } from "react";

/**
 * 1. 로컬 인터페이스 정의
 * plyr.d.ts의 구형 CJS 타입 구조와 Next.js 15+ 환경의 충돌을 피하기 위해,
 * 컴포넌트 내부(clean-up 함수)에서 실제 사용하는 .destroy() 메서드만 최소한으로 정의합니다.
 */
interface PlyrInstance {
  destroy: (callback?: () => void, soft?: boolean) => void;
}

/**
 * 2. 런타임 생성자(Constructor) 타입 정의
 * - 런타임(plyr.mjs): export { Plyr as default } -> 클래스가 .default 내부에 존재
 * - TS 설명서(plyr.d.ts): export = Plyr -> 모듈 자체가 클래스라 .default가 없다고 판단
 * * 이 타입 불일치를 해결하기 위해, "new 키워드로 호출하면 PlyrInstance를 반환하는 생성자 클래스"의 타입을 직접 선언합니다.
 */
type PlyrConstructor = new (
  target: HTMLElement,
  options?: Record<string, unknown>,
) => PlyrInstance;

interface YoutubePlayerProps {
  videoId: string;
}

export default function YoutubePlayer({ videoId }: YoutubePlayerProps) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  // PlyrInstance: 실제 사용하는 메서드만 명시한 로컬 인터페이스
  const playerRef = useRef<PlyrInstance | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    /**
     * 3. 동적 임포트(Dynamic Import) 및 타입 캐스팅
     * 정적 import 구문은 빌드 타임에 모듈 구조적 충돌(TS1192)을 일으키므로, useEffect 내부에서 비동기로 로드합니다.
     * * [핵심 캐스팅 로직]
     * TS는 module에 .default가 없다고 에러(TS2339)를 내지만, 실제 런타임에는 .default 안에 클래스가 있습니다.
     * 따라서 `as unknown`으로 TS의 기존 잘못된 추론을 완전히 백지화한 뒤,
     * `{ default: PlyrConstructor }` 모양이라고 명시적으로 강제 매핑(Bridge)해 줍니다.
     */
    import("plyr").then((module) => {
      const PlyrClass = (module as unknown as { default: PlyrConstructor })
        .default;

      // 안전하게 꺼내온 진짜 클래스로 인스턴스 생성
      playerRef.current = new PlyrClass(videoRef.current!, {
        loop: { active: true }, //plyr 반복재생시킴
        controls: ["play", "mute"], //재생버튼, 뮤트
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
    });

    // 4. 언마운트 시 클린업
    return () => {
      playerRef.current?.destroy(); // 메모리 누수 방지를 위한 언마운트 시 인스턴스 해제
      playerRef.current = null;
    };
  }, [videoId]);

  // videoId가 없을 경우 예외처리
  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400">
        재생할 영상 ID가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
      <div
        ref={videoRef}
        id="player"
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoId}
      ></div>
    </div>
  );
}
