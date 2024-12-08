import { ReactNode } from "react";

export type Menu = {
  Id: string;
  Title: string;
  PageAddress: string;
  Children: Menu[];
};

export type SimpleMenu = {
  Id: string;
  Title: string;
  PageAddress: string;
  Content: ReactNode;
};
