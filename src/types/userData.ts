export interface TUserData {
  message?: string;
  posts?: string[];
  user: {
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
    posts: string[];
    resetPasswordToken?: string;
    resetPasswordExpiresAt?: Date;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}
