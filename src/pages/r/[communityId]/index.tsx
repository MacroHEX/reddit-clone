import React from "react";
import { GetServerSidePropsContext } from "next";

import { Community, communityState } from "@/atoms/communitiesAtom";

import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "@/firebase/clientApp";

import safeJsonStringify from "safe-json-stringify";

import NotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/layouts/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Post/Posts";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import About from "../../../components/Community/About";

type Props = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  if (!communityData) {
    return <NotFound />;
  }

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
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
      "communities",
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
