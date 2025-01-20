import { useState } from "react";
import Button from "./Button";
import { addComment } from "../utilsQuery/comment";

const InputComment = ({
  postId,
  refetch,
}: {
  postId: string | undefined;
  refetch: () => void;
}) => {
  const [commentBody, setCommentBody] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentBody(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentBody) return;
    try {
      const response = await addComment(postId, commentBody);
      setCommentBody("");
      refetch();
      return response.data;
    } catch (err) {
      console.error("error adding post", err);
    }
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={commentBody}
        onChange={handleCommentChange}
        placeholder="Add comment"
        className="w-full outline-none"
      />

      <Button variant="link" onClick={handleCommentSubmit}>
        Send
      </Button>
    </div>
  );
};

export default InputComment;
