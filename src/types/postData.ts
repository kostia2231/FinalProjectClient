export interface IPost {
  _id: string;
  caption?: string;
  imgUrls: string[];
}

export interface IPostData {
  message: string;
  post: IPost;
}

export interface IPostsData {
  message: string;
  posts: IPost[];
}
