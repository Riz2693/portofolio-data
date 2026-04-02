// "use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { useState, useEffect } from "react";

// export function ThemeProvider({ children }) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   if (!mounted) {
//     // return <div className="invisible">{children}</div>;
//   }

//   return (
//     <NextThemesProvider
//       attribute="class"
//       defaultTheme="system"
//       enableSystem
//       disableTransitionOnChange
//     >
//       {children}
//     </NextThemesProvider>
//   );
// }

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
    // Hapus state 'mounted' dan 'useEffect'.
    // Biarkan NextThemesProvider dirender di server & client.

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
}
