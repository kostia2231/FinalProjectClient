import PostModal from "../../components/postModal";
import { postModalWrapperRoute } from "../../routes";

const PostModalWrapper = () => {
  const { postId }: { postId: string } = postModalWrapperRoute.useParams();

  return (
    <>
      <PostModal postId={postId} onClose={() => window.history.back()} />
    </>
  );
};

export default PostModalWrapper;
