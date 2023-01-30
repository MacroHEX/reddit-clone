import { Timestamp } from "@firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityimageURL?: string;
  createdAt: Timestamp;
};

export type PostVote = {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  post: Post[];
  postVotes: PostVote[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  post: [],
  postVotes: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
