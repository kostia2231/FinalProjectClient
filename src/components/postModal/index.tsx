import { createPortal } from "react-dom";
import { FC, useState, useEffect } from "react";
import InputComment from "../../ui/InputComment";
import { useOnePost } from "../../utils/useOnePost";
import { useUserById } from "../../utils/useUser";

interface ICreateModal {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const PostModal: FC<ICreateModal> = ({ isOpen, onClose, postId }) => {
  const { data, isFetching } = useOnePost({ postId });
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { data: userData } = useUserById({
    userId,
  });

  // console.log(data);
  // console.log(userId);
  // console.log(userData);

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
          {!isFetching && (
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
                    <div>+++</div>
                  </div>
                  <div className="p-3 flex gap-2">
                    <div className="font-medium">{userData?.user.username}</div>
                    <div>{data?.post.caption}</div>
                  </div>
                </div>
                <div className="p-3 mt-auto border-t">
                  <InputComment />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    modalRoot,
  );
};

export default PostModal;
