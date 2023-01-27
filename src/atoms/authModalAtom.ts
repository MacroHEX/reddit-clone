import { atom } from "recoil";

export interface AuthModalstate {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

export type ModalView = "login" | "signup" | "resetPassword";

const defaultModalState: AuthModalstate = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalstate>({
  key: "authModalState",
  default: defaultModalState,
});
