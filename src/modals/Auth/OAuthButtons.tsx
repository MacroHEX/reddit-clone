import { auth } from "@/firebase/clientApp";
import {
  useSignInWithGoogle,
  useSignInWithTwitter,
} from "react-firebase-hooks/auth";

import { Button, Flex, Image, Text } from "@chakra-ui/react";

const OAuthButtons = () => {
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const [signInWithTwitter, userTwitter, loadingTwitter, errorTwitter] =
    useSignInWithTwitter(auth);

  return (
    <Flex direction="column" mb={4} width="100%">
      <Button
        variant="oauth"
        mb={2}
        isLoading={loadingGoogle}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image
          src="/images/Google_Logo.svg"
          alt="google"
          height="20px"
          mr={4}
        />
        Ingresa con Google
      </Button>
      {/* Pendiente de Respuesta de Twitter Dev */}
      {/* <Button
        variant="oauth"
        mb={2}
        isLoading={loadingTwitter}
        onClick={() => {
          signInWithTwitter();
        }}
      >
        <Image
          src="/images/Twitter_Logo.svg"
          alt="google"
          height="20px"
          mr={4}
        />
        Ingresa con Twitter
      </Button>*/}
      <Text>{errorGoogle?.message || errorTwitter?.message}</Text>
    </Flex>
  );
};

export default OAuthButtons;
