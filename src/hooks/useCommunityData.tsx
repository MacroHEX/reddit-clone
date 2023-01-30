import React, { useEffect, useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";
import { Community, communityState } from "@/atoms/communitiesAtom";
import { CommunitySnippet } from "@/atoms/communitiesAtom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { authModalState } from "../atoms/authModalAtom";
import {
  getDocs,
  collection,
  writeBatch,
  doc,
  increment,
} from "@firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);

  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const setAuthModalState = useSetRecoilState(authModalState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user sign in
    // if not => open auth modal
    if (!user) {
      // open modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // get user snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    //batch write
    try {
      // creating a new commnity snippet
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      // updating the number of members
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // update recoil state - communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    //batch write
    const batch = writeBatch(firestore);
    // deleting a new commnity snippet
    batch.delete(
      doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
    );

    // updating the number of members(-1)
    batch.update(doc(firestore, "communities", communityId), {
      numberOfMembers: increment(-1),
    });

    await batch.commit();
    // update recoil state - communityState.mySnippets
    setCommunityStateValue((prev) => ({
      ...prev,
      mySnippets: prev.mySnippets.filter(
        (item) => item.communityId !== communityId
      ),
    }));
    try {
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    // data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
