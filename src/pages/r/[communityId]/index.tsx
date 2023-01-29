import React from "react";
import { GetServerSidePropsContext } from "next";

import { Community } from "@/atoms/communitiesAtom";

import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "@/firebase/clientApp";

import safeJsonStringify from "safe-json-stringify";

import NotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/layouts/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Post/Posts";

type Props = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <div>Derecha</div>
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const communityDocRef = doc(
      firestore,
      "community",
      ctx.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // Se puede añadir página de error
    console.log("getServerSideProps error", error);
  }
};
