import { X } from 'lucide-react'
import Button from './Button'

function Modal({ title, description, isOpen, onClose, children, fullScreen = false }) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 ${
        fullScreen ? 'p-2 md:p-4' : 'flex items-end justify-center p-4 md:items-center'
      }`}
    >
      <div
        className={`w-full rounded-2xl border border-white/10 bg-ink-800 shadow-card ${
          fullScreen ? 'mx-auto flex h-full max-w-7xl flex-col p-4 md:p-5' : 'max-w-lg p-5 md:p-6'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {description ? <p className="mt-1 text-sm text-ink-500">{description}</p> : null}
          </div>
          <Button variant="ghost" className="h-9 w-9 p-0" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </Button>
        </div>
        <div className={fullScreen ? 'min-h-0 flex-1 overflow-y-auto pr-1' : ''}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
