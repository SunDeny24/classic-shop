// 유튜브 컴포넌트 - plyr 사용

"use client";
import "plyr/dist/plyr.css";
import { useEffect, useRef } from "react";

/**
 * 로컬 인터페이스 정의
 * plyr.d.ts의 구형 CJS 타입 구조와 Next.js 15+ 환경의 충돌을 피하기 위해,
 * 컴포넌트 내부(clean-up 함수)에서 실제 사용하는 .destroy() 메서드만 최소한으로 정의합니다.
 */
interface PlyrInstance {
  destroy: (callback?: () => void, soft?: boolean) => void;
}

/**
 * 런타임 생성자 타입 정의
 * - 런타임(plyr.mjs): export { Plyr as default } → 클래스가 .default 내부에 존재
 * - TS 설명서(plyr.d.ts): export = Plyr → 모듈 자체가 클래스라 .default가 없다고 판단
 * 이 타입 불일치를 해결하기 위해, "new 키워드로 호출하면 PlyrInstance를 반환하는 생성자 클래스"의 타입을 직접 선언합니다.
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
  const playerRef = useRef<PlyrInstance | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Race Condition 방지:
    // import("plyr") 콜백이 실행되기 전에 컴포넌트가 언마운트되면
    // videoRef.current가 이미 null인 상태에서 Plyr 초기화가 실행될 수 있습니다.
    // cancelled 플래그로 언마운트 여부를 추적하여 안전하게 중단합니다.
    let cancelled = false;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

    /**
     * 동적 임포트(Dynamic Import) 및 타입 캐스팅
     * 정적 import 구문은 빌드 타임에 모듈 구조 충돌(TS1192)을 일으키므로,
     * useEffect 내부에서 비동기로 로드합니다.
     */
    import("plyr").then((module) => {
      // 언마운트되었거나 ref가 사라진 경우 Plyr 초기화 중단
      if (cancelled || !videoRef.current) return;

      const PlyrClass = (module as unknown as { default: PlyrConstructor })
        .default;

      playerRef.current = new PlyrClass(videoRef.current, {
        loop: { active: true },
        controls: ["play", "mute"],
        iconUrl: "/plyr.svg", // CDN 대신 로컬 호스팅 SVG 사용 (CSP 허용)
        youtube: {
          noCookie: false,
          iv_load_policy: 3, // 자막/주석 숨기기
          loop: 1,
          playlist: videoId, // 종료 후 루프를 위해 동일 영상 재생
          origin: baseUrl,
        },
      });
    });

    return () => {
      cancelled = true; // import 콜백이 아직 실행 중이라면 초기화 중단
      playerRef.current?.destroy(); // 메모리 누수 방지
      playerRef.current = null;
    };
  }, [videoId]);

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
        id={`plyr-${videoId}`} // 고유 ID로 구분
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoId}
      ></div>
    </div>
  );
}
