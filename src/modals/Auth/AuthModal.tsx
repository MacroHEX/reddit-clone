import {
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";

import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "Iniciar Sesión"}
            {modalState.view === "signup" && "Registrarse"}
            {modalState.view === "resetPassword" && "Restablece tu Contraseña"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              width="70%"
            >
              <OAuthButtons />
              <Text color="gray.500" fontWeight={700}>
                O
              </Text>
              <AuthInputs />
              {/* ResetPassword */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
