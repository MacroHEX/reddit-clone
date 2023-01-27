import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

const AuthButtons = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        mr={2}
        ml={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Iniciar Sesión
      </Button>
      <Button
        height="28px"
        mr={2}
        display={{ base: "none", sm: "flex" }}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Registrarse
      </Button>
    </>
  );
};

export default AuthButtons;
