export interface TPost {
  _id: string;
  userId: string;
  caption?: string;
  imgUrls: string[];
}

export interface TPostData {
  message: string;
  post: TPost;
}

export interface TPostsData {
  message: string;
  posts: TPost[];
}
