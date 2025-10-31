"use client";

import { HTMLAttributes } from "react";

export function TextWithLineBreaks({
  text,
  className,
  ...props
}: { text: string } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p style={{ whiteSpace: "pre-line" }} className={className} {...props}>
      {text}
    </p>
  );
}
