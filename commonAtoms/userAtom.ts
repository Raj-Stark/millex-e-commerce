import { atomWithStorage } from "jotai/utils";
export const userAtom = atomWithStorage("user", {
  isLoggedIn: false,
  name: "",
  userId: "",
});
