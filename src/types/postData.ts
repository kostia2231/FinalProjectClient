export interface TPost {
  _id: string;
  userId: string;
  caption?: string;
  imgUrls: string[];
  likesCount: number;
  likes: string[];
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
