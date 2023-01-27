import { auth } from "@/firebase/clientApp";
import AuthModal from "@/modals/Auth/AuthModal";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "@firebase/auth";

import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

interface Props {
  user?: User | null;
}

const RightContent = ({ user }: Props) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user}/>
      </Flex>
    </>
  );
};

export default RightContent;
