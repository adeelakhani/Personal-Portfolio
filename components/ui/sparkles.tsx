"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const SparklesCore = ({
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  className,
}: {
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  className?: string
}) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const sparklesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (sparklesRef.current) {
        setSize({
          width: sparklesRef.current.offsetWidth,
          height: sparklesRef.current.offsetHeight,
        })
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const createSparkle = () => {
    const sparkle = document.createElement("div")
    sparkle.className = "absolute animate-sparkle rounded-full"
    sparkle.style.width = `${Math.random() * (maxSize || 4) + (minSize || 1)}px`
    sparkle.style.height = sparkle.style.width
    sparkle.style.background = particleColor || "#FFF"
    sparkle.style.left = `${Math.random() * size.width}px`
    sparkle.style.top = `${Math.random() * size.height}px`
    sparkle.style.opacity = "0"
    return sparkle
  }

  useEffect(() => {
    if (!sparklesRef.current) return
    const density = particleDensity || 1
    const sparkles = []
    const createSparkles = () => {
      for (let i = 0; i < 10 * density; i++) {
        const sparkle = createSparkle()
        sparklesRef.current?.appendChild(sparkle)
        sparkles.push(sparkle)
      }
    }
    createSparkles()
    return () => {
      sparkles.forEach((sparkle) => sparkle.remove())
    }
  }, [size, minSize, maxSize, particleColor, particleDensity, createSparkle])

  return (
    <div
      ref={sparklesRef}
      className={cn("relative h-full w-full", className)}
      style={{
        background: background || "transparent",
      }}
    />
  )
}

