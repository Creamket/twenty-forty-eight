import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

interface MobileSwiperProps {
  children?: ReactNode
  onSwipe: ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => void
}

const MobileSwiper: FC<MobileSwiperProps> = ({ children, onSwipe }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      return
    }

    e.preventDefault()

    setStartX(e.touches[0].clientX)
    setStartY(e.touches[0].clientY)
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        return
      }

      e.preventDefault()

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const deltaX = endX - startX
      const deltaY = endY - startY

      onSwipe({ deltaX, deltaY })
    },
    [startX, startY, onSwipe]
  )

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  return <div ref={wrapperRef}>{children}</div>
}

export default MobileSwiper
