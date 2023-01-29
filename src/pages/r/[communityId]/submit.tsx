import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import { Box, Text } from "@chakra-ui/react";

import { auth } from "@/firebase/clientApp";
import PageContent from "@/layouts/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Crea una publicación</Text>
        </Box>

        {user && <NewPostForm user={user} />}

        {/* {user && (
          <NewPostForm
            communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}
          />
        )} */}
      </>
      <>
        {/* {communityStateValue.currentCommunity && (
        <>
        <About
        communityData={communityStateValue.currentCommunity}
        pt={6}
        onCreatePage
        loading={loading}
        />
        </>
      )} */}
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
