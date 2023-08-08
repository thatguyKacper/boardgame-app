import { ReactNode } from "react";
export interface ModalInterface {
  title: string;
  message: string;
  buttonColor: string;
  buttonText: string;
  onClose?: () => void,
  onAction?: () => void

}
export interface ChildrenInterface {
  children: ReactNode;
}

export interface CategoryItemInterface {
  category: string,
}

export interface StarInterface {
  onScore: () => void,
  full: boolean,
}