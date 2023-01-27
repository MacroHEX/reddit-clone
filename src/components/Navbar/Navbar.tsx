import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import Directory from "./Directory/Directory";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      bg="white"
      height="55px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image
          src="/images/CLT_LOGO.svg"
          alt="logo"
          height="40px"
          mr={{ base: 2, md: 0 }}
        />
        <Image
          src="/images/CLT_TEXT.svg"
          alt="text"
          height="54px"
          display={{ base: "none", md: "unset" }}
          mr={2}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
