import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="white" height="55px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/CLT_LOGO.svg" alt="logo" height="40px" mr={{base: 2, md:0}}/>
        <Image
          src="/images/CLT_TEXT.svg"
          alt="text"
          height="54px"
          display={{ base: "none", md: "unset" }}
          mr={2}
        />
      </Flex>
      {/* <Directory /> */}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
