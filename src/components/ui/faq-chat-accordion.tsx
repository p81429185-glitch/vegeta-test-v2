"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Emoji } from "@/components/ui/Emoji";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className={cn("p-4", className)}>
      {timestamp && (
        <div className="mb-6 text-center text-base text-white/60">{timestamp}</div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem ?? ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item value={item.id.toString()} key={item.id} className="mb-4">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-start justify-start gap-x-3 group">
                <div
                  className={cn(
                    "relative flex items-center gap-2 rounded-2xl rounded-tl-sm px-5 py-4 transition-colors shadow-md",
                    "bg-white text-[#111B21] hover:bg-white/95",
                    questionClassName,
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute text-2xl",
                        item.iconPosition === "right" ? "right-0 -top-4" : "-left-2 -top-4",
                      )}
                      style={{ transform: item.iconPosition === "right" ? "rotate(7deg)" : "rotate(-7deg)" }}
                    >
                      <Emoji size={28}>{item.icon}</Emoji>
                    </span>
                  )}
                  <span className="font-medium text-left text-lg md:text-xl leading-snug">
                    {item.question}
                  </span>
                  <span className="ml-2 shrink-0 text-[#111B21]/50">
                    {openItem === item.id.toString() ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <AnimatePresence initial={false}>
                {openItem === item.id.toString() && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 flex justify-end">
                      <div
                        className={cn(
                          "relative max-w-[85%] rounded-2xl rounded-tr-sm px-5 py-4 text-lg md:text-xl leading-relaxed shadow-md whitespace-pre-line",
                          "bg-[#D9FDD3] text-[#111B21]",
                          answerClassName,
                        )}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
