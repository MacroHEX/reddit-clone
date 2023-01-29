import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      Parece que esta comunidad no existe o fue suspendida.
      <Link href="/">
        <Button mt={4}>VOLVER AL INICIO</Button>
      </Link>
    </Flex>
  );
};
export default NotFound;
