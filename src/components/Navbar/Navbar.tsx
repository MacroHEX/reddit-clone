import React from "react";

import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/CLT_LOGO.svg" alt="logo" height="30px" />
        <Image
          src="/images/CLT_TEXT.svg"
          alt="text"
          height="46px"
          display={{ base: "none", md: "unset" }}
          mr={2}
        />
      </Flex>
      {/* <Directory /> */}
      <SearchInput />
      {/* <RightContent /> */}
    </Flex>
  );
};

export default Navbar;
