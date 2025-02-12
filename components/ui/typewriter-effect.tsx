"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 2,
          delay: stagger(0.2),
        },
      )
    }
  }, [isInView, animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <motion.span
              initial={{
                opacity: 0,
              }}
              key={word.text + idx}
              className={cn("text-white", word.className)}
            >
              {word.text}
              {idx < words.length - 1 ? " " : ""}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("text-center text-7xl font-bold lg:text-7xl md:text-6xl sm:text-4xl", className)}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2.2,
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("inline-block h-16 w-[6px] translate-y-1 bg-white", cursorClassName)}
      />
    </div>
  )
}

