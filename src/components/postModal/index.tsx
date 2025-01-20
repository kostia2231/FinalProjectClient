import { createPortal } from "react-dom";
import { FC, useState, useEffect } from "react";
import InputComment from "../../ui/InputComment";
import PostEditModal from "../postEditModel";
import { useOnePost } from "../../utilsQuery/useOnePost";
import { useUserById } from "../../utilsQuery/useUser";
import { NotificationIcon as LikeIcon } from "../../assets/menu_icons/MenuIcons";
import Button from "../../ui/Button";
import { like, unlike, likeStatus } from "../../utilsQuery/like";
import { TCommentData } from "../../types/commentData";
import { useComments } from "../../utilsQuery/useComments";
import { useDeleteComment } from "../../utilsQuery/useComments";

interface ICreateModal {
  isAdmin: boolean;
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const PostModal: FC<ICreateModal> = ({ isAdmin, isOpen, onClose, postId }) => {
  const { data, refetch } = useOnePost({ postId });
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const { data: userData } = useUserById({
    userId,
  });
  const { data: commentsData, refetch: commentsRefetch } = useComments(postId);
  const { mutateAsync } = useDeleteComment();
  const [comments, setComments] = useState<TCommentData[]>([]);

  console.log(commentsData, "comments");

  useEffect(() => {
    if (commentsData) setComments(commentsData.comments);
  }, [commentsData]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const result = await likeStatus(postId);
      setIsLiked(result.isLiked);
    };

    fetchLikeStatus();
  }, [postId]);

  useEffect(() => {
    if (data?.post.userId) {
      setUserId(data.post.userId);
    }
  }, [data]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("post-modal");
  if (!modalRoot) {
    console.error("element with id:post-modal not found.");
    return null;
  }

  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function toggleEditModal() {
    setIsEditModalOpen((prev) => !prev);
  }

  const handleLike = async () => {
    if (!isLiked) {
      await like(postId);
      refetch();
    } else {
      await unlike(postId);
      refetch();
    }
    setIsLiked((prev) => !prev);
  };

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
          (
          <div className="bg-white w-fit h-fit flex">
            <div>
              {data?.post.imgUrls.map((imgUrl) => (
                <img
                  key={data.post._id}
                  src={imgUrl}
                  className="h-[500px] w-[500px] object-cover"
                />
              ))}
            </div>
            <div className="text-sm w-[300px] flex flex-col">
              <div>
                <div className="flex justify-between gap-6 border-b p-3">
                  <div className="font-medium">{userData?.user.username}</div>
                  <div onClick={toggleEditModal} className="cursor-pointer">
                    +++
                  </div>
                </div>
                <div className="p-3 flex gap-2 flex-col">
                  <div className="flex gap-2">
                    <div className="font-medium">{userData?.user.username}</div>
                    <div>{data?.post.caption}</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {comments.map((comment) => (
                      <div key={comment._id} className="flex flex-col">
                        <div className="flex gap-2">
                          <div className="font-medium">
                            {comment.userId.username}
                          </div>
                          <div>{comment.commentBody}</div>
                          <div className="ml-auto">like</div>
                        </div>
                        <div className="flex gap-2">
                          <div>- {comment.likesCount} likes</div>
                          <div
                            onClick={() => {
                              mutateAsync(comment._id).then(() => {
                                commentsRefetch();
                              });
                            }}
                            className="cursor-pointer"
                          >
                            - delete
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
          )
        </div>

        {isEditModalOpen && (
          <PostEditModal
            isAdmin={isAdmin}
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
