import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if device is touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }
    const enter = () => {
      cursorRef.current?.classList.add('hover')
      ringRef.current?.classList.add('hover')
    }
    const leave = () => {
      cursorRef.current?.classList.remove('hover')
      ringRef.current?.classList.remove('hover')
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
