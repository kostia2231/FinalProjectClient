export interface IPost {
  _id: string;
  caption?: string;
  imgUrls: string[];
}

export interface IPostsData {
  message: string;
  posts: IPost;
}
