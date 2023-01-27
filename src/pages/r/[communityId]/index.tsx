import React from "react";
import { GetServerSidePropsContext } from "next";

import { Community } from "@/atoms/communitiesAtom";

import { doc } from "@firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { getDoc } from "firebase/firestore";

import safeJsonStringify from "safe-json-stringify";

type Props = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
  if (!communityData) {
    return <div>No existe</div>;
  }

  return <div>{communityData.id}</div>;
};

export default CommunityPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
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
    // Añadir pagina de error
    console.log("getServerSideProps error", error);
  }
}
