import AuthModal from "@/modals/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";

import AuthButtons from "./AuthButtons";

type Props = {};

const RightContent = (props: Props) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
