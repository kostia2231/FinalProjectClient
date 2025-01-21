import { createPortal } from "react-dom";
import { FC, useState, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import InputComment from "../../ui/InputComment";
import PostEditModal from "../postEditModel";
import { useOnePost } from "../../utilsQuery/useOnePost";
import { useUserById } from "../../utilsQuery/useUser";
import { NotificationIcon as LikeIcon } from "../../assets/menu_icons/MenuIcons";
import Button from "../../ui/Button";
import { like, unlike, likeStatus } from "../../utilsQuery/like";
import {
  likeComment,
  unlikeComment,
  commentLikeStatus,
} from "../../utilsQuery/commentLike";
import { TCommentData } from "../../types/commentData";
import { useComments } from "../../utilsQuery/useComments";
import { useDeleteComment } from "../../utilsQuery/useComments";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { TUserData } from "../../types/userData";

export interface ICreateModal {
  isOwner?: boolean;
  onClose: () => void;
  postId: string;
}

const PostModal: FC<ICreateModal> = ({ onClose, postId }) => {
  const navigate = useNavigate();
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const ownerUserId = localStorage.getItem("userId");

  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const { data, refetch } = useOnePost({ postId });
  const { fetchUserById } = useUserById({ userId });
  const [userData, setUserData] = useState<TUserData | null>(null);

  const { data: commentsData, refetch: commentsRefetch } = useComments(postId);
  const { mutateAsync } = useDeleteComment();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentLikes, setCommentLikes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<TCommentData[]>([]);

  const fetchCommentLikes = async (comments: TCommentData[]) => {
    const updatedCommentLikes: Record<string, boolean> = {};

    for (const comment of comments) {
      try {
        const status = await commentLikeStatus(comment._id);
        updatedCommentLikes[comment._id] = status.isLiked;
      } catch (error) {
        console.error("error fetching comment like status:", error);
      }
    }

    return updatedCommentLikes;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const user = await fetchUserById(userId);
          setUserData(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, fetchUserById]);

  useEffect(() => {
    const fetchData = async () => {
      if (commentsData) {
        setComments(commentsData.comments);

        const likesStatus = await fetchCommentLikes(commentsData.comments);
        setCommentLikes(likesStatus);
      }
    };

    fetchData();
  }, [commentsData]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const result = await likeStatus(postId);
      setIsLiked(result.isLiked);
    };

    fetchLikeStatus();
  }, [postId]);

  useEffect(() => {
    if (data) {
      setUserId(data.post.userId);
    }
  }, [data]);

  useEffect(() => {
    if (data?.post.userId === ownerUserId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [ownerUserId, data?.post.userId]);

  const memoizedComments = useMemo(() => comments, [comments]);

  function toUser(userId: string | undefined) {
    navigate({ to: `/${userId}` });
  }

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await like(postId);
      } else {
        await unlike(postId);
      }
      setIsLiked((prev) => !prev);
      refetch();
    } catch (error) {
      console.error("error liking post:", error);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    try {
      const newLikeStatus = !commentLikes[commentId];
      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: newLikeStatus,
      }));

      if (newLikeStatus) {
        await likeComment(commentId);
      } else {
        await unlikeComment(commentId);
      }

      const status = await commentLikeStatus(commentId);
      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: status.isLiked,
      }));
      commentsRefetch();
    } catch (error) {
      console.error("error liking comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await mutateAsync(commentId);
      commentsRefetch();
    } catch (error) {
      console.error("error deleting comment:", error);
    }
  };

  const modalRoot = document.getElementById("post-modal");
  if (!modalRoot) {
    console.error("element with id:post-modal not found.");
    return null;
  }

  return createPortal(
    <>
      <div
        className="fixed h-full w-full z-2 top-0 ring-0 bg-black/70 overflow-auto"
        onClick={handleModalClick}
      >
        <div
          onClick={handleModalClick}
          className="h-full w-full flex justify-center items-center"
        >
          <div className="bg-white w-fit h-fit flex">
            <div>
              {data?.post.imgUrls.map((imgUrl) => (
                <img
                  key={data.post._id}
                  src={imgUrl}
                  className="h-[600px] w-[600px] object-cover"
                />
              ))}
            </div>
            <div className="text-sm w-[400px] flex flex-col">
              <div>
                <div className="flex justify-between gap-6 border-b p-3">
                  <div className="font-medium flex items-center gap-3">
                    <div className="w-6 h-6 border rounded-full" />
                    <div
                      onClick={() => toUser(userData?.user.username)}
                      className="cursor-pointer"
                    >
                      {userData?.user.username}
                    </div>
                  </div>
                  <div onClick={toggleEditModal} className="cursor-pointer">
                    +++
                  </div>
                </div>
                <div className="p-3 flex gap-8 flex-col">
                  <div className="flex gap-3 flex-col">
                    <div className="flex gap-3 items-start">
                      <div>
                        <div className="w-6 h-6 border rounded-full" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3">
                          <div
                            className="font-medium cursor-pointer"
                            onClick={() => toUser(userData?.user.username)}
                          >
                            {userData?.user.username}
                          </div>
                          <div> {data?.post.caption}</div>
                        </div>

                        <div className="text-xs text-gray-400">
                          {timeAgo.format(
                            new Date(data?.post.createdAt ?? new Date()),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {memoizedComments.map((comment) => (
                      <div key={comment._id} className="flex gap-3">
                        <div>
                          <div className="w-6 h-6 border rounded-full" />
                        </div>

                        <div className="flex flex-col w-full gap-2">
                          <div className="flex gap-3 items-start">
                            <div
                              className="font-medium cursor-pointer"
                              onClick={() => toUser(comment.userId.username)}
                            >
                              {comment.userId.username}
                            </div>
                            <div>{comment.commentBody}</div>
                            <div
                              className="ml-auto cursor-pointer text-xs text-gray-400"
                              onClick={() => handleCommentLike(comment._id)}
                            >
                              {commentLikes[comment._id] ? "Liked" : "Like"}
                            </div>
                          </div>
                          <div className="flex gap-4 text-gray-400 text-xs items-end">
                            <div>
                              {timeAgo.format(new Date(comment.createdAt))}
                            </div>
                            <div>Likes: {comment.likesCount}</div>
                            {comment.userId._id === ownerUserId && (
                              <div
                                onClick={() => handleDeleteComment(comment._id)}
                                className="cursor-pointer text-gray-400 text-xs"
                              >
                                Delete
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <div className="p-3 flex flex-col gap-2">
                  <span>
                    <Button
                      variant="icon"
                      icon={<LikeIcon />}
                      onClick={handleLike}
                      className={`${isLiked ? "text-red-500" : ""}`}
                    />
                  </span>
                  <p>{data?.post.likesCount} likes</p>
                </div>
                <div className="p-3 border-t">
                  <InputComment
                    postId={data?.post._id}
                    refetch={commentsRefetch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditModalOpen && (
          <PostEditModal
            isOwner={isOwner}
            isOpen={isEditModalOpen}
            onClose={toggleEditModal}
            postId={postId}
          />
        )}
      </div>
    </>,
    modalRoot,
  );
};

export default PostModal;
