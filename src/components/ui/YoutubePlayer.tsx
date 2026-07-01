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

    // Race Condition 방지 변수추가 : plyr을 import 되기 전에 언마운트되면
    // videoRef.current가 null인 상태에서 Plyr 초기화가 실행될 수 있음.
    // cancelled 플래그로 언마운트 여부를 추적하여 안전하게 중단시켜주기
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
      // 인스턴스 생성 프로세스 try-cath문으로 초기화 막기
      try {
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

        // 만약 인스턴스가 갓 생성된 찰나에 이미 cancelled가 true로 변했다면 즉시 파괴
        if (cancelled) {
          playerRef.current?.destroy();
          playerRef.current = null;
        }
      } catch (initError) {
        console.warn(
          "Plyr 초기화 중 무시해도 되는 사소한 예외 발생:",
          initError,
        );
      }
    });
    // 클린업
    return () => {
      cancelled = true; // import 콜백이 아직 실행 중이라면 초기화 중단

      // 이미 언마운트된 컴포넌트에서 plyr을 파괴하려할때 발생하는 에러를 try-catch로 안전하게 무시하고
      // playerRef.current를 null로 초기화하여 메모리 누수 방지
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === "function") {
            playerRef.current.destroy();
          }
        } catch (destroyError) {
          console.warn(
            "Plyr destroy 과정에서 안전하게 가로챈 예외:",
            destroyError,
          );
          //
        } finally {
          playerRef.current = null;
        }
      }
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
