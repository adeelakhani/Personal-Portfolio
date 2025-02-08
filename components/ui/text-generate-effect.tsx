"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function TextGenerateEffect({ words }: { words: string }) {
  const [wordArray, setWordArray] = useState<string[]>([])

  useEffect(() => {
    setWordArray(words.split(" "))
  }, [words])

  return (
    <div className="text-lg leading-snug tracking-wide text-white/80">
      {wordArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: idx * 0.1,
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </div>
  )
}

