import React, { useEffect, useState } from "react";

import usePosts from "../../hooks/usePosts";

import { Post } from "@/atoms/postsAtoms";
import { Community } from "@/atoms/communitiesAtom";

import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
} from "@firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";
type Props = {
  communityData: Community;
};

const Posts = ({ communityData }: Props) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const getPosts = async () => {
    try {
      setLoading(true);
      // get posts for the community
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        post: posts as Post[],
      }));

      // Store in post state
      //   console.log("post", posts);
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.post.map((item) => {
            return (
              <PostItem
                key={item.id}
                post={item}
                userIsCreator={user?.uid === item.creatorId}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (vote) => vote.postId === item.id
                  )?.voteValue
                }
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
              />
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default Posts;
