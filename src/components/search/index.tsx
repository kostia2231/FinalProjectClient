import { forwardRef, ChangeEvent, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { searchUsers } from "../../utilsQuery/searchUsers";

interface IUserResponce {
  _id: string;
  username: string;
  profileImg: string;
}

const Search = forwardRef<HTMLDivElement>((_, ref): JSX.Element => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUserResponce[] | null>(null);

  const handleClick = (username: string) => {
    if (users) navigate({ to: `/${username}` });
  };

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length > 0) {
      const users = await searchUsers(query);
      setUsers(users);
    }
  };

  return (
    <div
      className="py-6 px-3 border-r rounded-e-[16px] bg-white w-72 flex flex-col gap-6"
      ref={ref}
    >
      <p className="text-2xl font-semibold">Search</p>
      <input
        className="border-none outline-none bg-gray-100 w-full p-3 text-sm rounded-xl font-light"
        type="text"
        placeholder="Search"
        onInput={handleInput}
      />
      <div>
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => handleClick(user.username)}
            className="cursor-pointer w-full hover:text-black/50 py-3 flex gap-2 items-center"
          >
            <div className="h-8 w-8 rounded-full border"></div>
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Search;
