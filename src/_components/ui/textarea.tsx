import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'font-poppins  file:text-darkgray placeholder:text-darkgray selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-30 w-full rounded-md border bg-white border-darkgray/20 focus:border-none  px-4 py-4 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-darkgray/20 file:bg-white file:text-base  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ',
        'focus-visible:border-ring focus-visible:ring-lightgray  focus-visible:ring-[1px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      )}
      {...props}
    />
  )
}

export { Textarea }
