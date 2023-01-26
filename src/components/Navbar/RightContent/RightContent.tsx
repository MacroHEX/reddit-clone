import { auth } from "@/firebase/clientApp";
import AuthModal from "@/modals/Auth/AuthModal";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "@firebase/auth";

import AuthButtons from "./AuthButtons";

interface Props {
  user: User | null | undefined;
}

const RightContent = ({ user }: Props) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button
            onClick={() => {
              signOut(auth);
            }}
          >
            Salir
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;
