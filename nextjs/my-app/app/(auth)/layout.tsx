import { ReactNode } from "react";

export default function Authlayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="p-4 border-b">Welcome!</div>
      {children}
    </div>
  );
}
