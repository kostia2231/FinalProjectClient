import { TPostsData } from "./postData";

export interface TUserData {
  message?: string;
  posts?: TPostsData;
  isFollowing: boolean;
  user: {
    _id: string;
    username: string;
    new_username: string;
    email: string;
    fullName: string;
    password: string;
    bio: string;
    website: string;
    profileImg: string;
    followersCount: number;
    followers: string[];
    followingCount: number;
    following: string[];
    postsCount: number;
    posts: TPostsData;
    resetPasswordToken?: string;
    resetPasswordExpiresAt?: Date;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}
