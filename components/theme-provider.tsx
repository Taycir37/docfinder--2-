"use client"

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem={props.enableSystem ?? true}
      enableColorScheme={true}
      attribute={props.attribute ?? "class"}
    >
      {children}
    </NextThemesProvider>
  )
}
