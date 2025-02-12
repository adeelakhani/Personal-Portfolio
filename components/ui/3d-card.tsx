"use client"

import { cn } from "@/lib/utils"
import { useSpring, motion } from "framer-motion"
import React, { useRef} from "react"

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // const [isHovered, setIsHovered] = useState(false)
  const rotateX = useSpring(0, { stiffness: 100, damping: 10 })
  const rotateY = useSpring(0, { stiffness: 100, damping: 10 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const { left, top, width, height } = container.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    rotateX.set(-y)
    rotateY.set(x)
  }

  const handleMouseLeave = () => {
    // setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
      // onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn("group/card relative w-full", className)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export const CardBody = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("h-full w-full", className)}>
      {children}
    </div>
  ),
)
CardBody.displayName = "CardBody"

export const CardItem = ({
  as: Component = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
}) => {
  return (
    <Component
      className={cn("", className)}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
