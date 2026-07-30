export default function ConfirmModal({
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  danger = false
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      onClick={onCancel}
    >
      <div className="bg-white rounded-card p-5 w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
        <p className="text-[15px] font-bold text-forest mb-2">{title}</p>
        {description && (
          <p className="text-[13px] text-forest/70 mb-5 leading-relaxed">{description}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 text-[13px] font-semibold text-forest/70 bg-cardgreen rounded-[10px] py-2.5"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 text-[13px] font-semibold text-white rounded-[10px] py-2.5 ${
              danger ? 'bg-[#c94f4f]' : 'bg-forest'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
