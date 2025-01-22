export interface TPost {
  _id: string;
  userId: string;
  user: {
    _id: string;
    username: string;
    profileImg: string;
  };
  caption?: string;
  imgUrls: string[];
  likesCount: number;
  likes: string[];
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TPostData {
  message: string;
  post: TPost;
}

export interface TPostsData {
  posts: TPost[];
}
