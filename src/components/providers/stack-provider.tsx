"use client";

import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@/lib/stack-client";

export default function StackClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StackProvider app={stackClientApp}>
      <StackTheme>
        {children}
      </StackTheme>
    </StackProvider>
  );
}
