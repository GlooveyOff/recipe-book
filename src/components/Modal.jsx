import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function Modal({ isOpen, title, children, onClose, className = '' }) {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationFrame
    let closeTimer

    if (isOpen) {
      setShouldRender(true)
      animationFrame = requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
      closeTimer = setTimeout(() => setShouldRender(false), 220)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(closeTimer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [isOpen, onClose])

  if (!shouldRender) return null

  return createPortal(
    <div
      className={`modal-backdrop ${isVisible ? 'modal-backdrop--visible' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body,
  )
}

export default Modal
