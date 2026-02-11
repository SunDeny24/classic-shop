//공통 팝업 컴포넌트
'use client';

/**
 ** 공통 팝업 컴포넌트
 * * @param {Object} props
 * @param {boolean} props.isOpen - 팝업의 표시 여부
 * @param {string} props.title - 팝업 상단에 표시될 제목
 * @param {string} props.message - 팝업 중앙에 표시될 상세 메시지
 * @param {Function} props.onConfirm - 확인 버튼 클릭 시 실행할 함수
 * @param {Function} [props.onCancel] - 취소 버튼 클릭(또는 배경 클릭) 시 실행할 함수 (선택 사항)
 * @param {string} [props.confirmText="확인"] - 확인 버튼에 표시할 텍스트
 * @param {string} [props.cancelText="취소"] - 취소 버튼에 표시할 텍스트
 * @returns {JSX.Element|null} 팝업 컴포넌트 또는 null
 */

export default function PopupMessage({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = '확인',
    cancelText = '취소',
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* 배경 레이어 (어둡게 처리) */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel} // 배경 클릭 시 취소 처리
            />

            {/* 팝업 본체 */}
            <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl transition-all">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{message}</p>
                </div>

                {/* 하단 버튼 영역 */}
                <div className="mt-8 flex gap-3">
                    {/* onCancel 함수가 전달되었을 때만 취소 버튼 표시 */}
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
