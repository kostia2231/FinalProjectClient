export interface TCommentData {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  commentBody: string;
  likesCount: number;
  parentCommentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TCommentsData {
  comments: TCommentData[];
}
