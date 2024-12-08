import { ReactNode } from "react";

export type TabData = {
  Id: string;
  Title: ReactNode | string;
  Content: ReactNode | null;
};
