import React from "react";

import { User } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

import { Flex, Image } from "@chakra-ui/react";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";

import Directory from "./Directory";
import useDirectory from "../../hooks/useDirectory";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  // Use <Link> for initial build; implement directory logic near end
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/CLT_LOGO.svg" height="40px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/CLT_TEXT.svg"
          height="46px"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user as User} />
      <RightContent user={user as User} />
    </Flex>
  );
};
export default Navbar;
