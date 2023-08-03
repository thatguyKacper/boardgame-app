import { ReactNode } from "react";
export interface ModalInterface {
  title: string;
  message: string;
  buttonColor: string;
  buttonText: string;
}
export interface ChildrenInterface {
  children: ReactNode;
}

export interface CategoryItemInterface {
  category: string,
}