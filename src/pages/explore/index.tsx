import { useState, useEffect } from "react";
import { useAllPosts } from "../../utilsQuery/useAllPosts";
import { TPost } from "../../types/postData";

const Explore = (): JSX.Element => {
  const { data } = useAllPosts();
  const [allPosts, setAllPosts] = useState<TPost[] | null>(null);

  useEffect(() => {
    if (data && data.posts) setAllPosts(data.posts);
  }, [data]);

  console.log(allPosts);

  return (
    <div className="grid grid-cols-3 gap-1">
      {allPosts?.map((post) => (
        <div key={post._id} className="cursor-pointer">
          <img
            src={post.imgUrls[0]}
            alt={`image for post ${post._id}`}
            className="w-[270px] h-[270px] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Explore;
