import React, { ReactNode } from "react";

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="border-small px-1 py-2 rounded-small border-primary-200 dark:border-primary-100">
    {children}
  </div>
);