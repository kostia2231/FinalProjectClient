import { forwardRef } from "react";

const Search = forwardRef<HTMLDivElement>((_, ref): JSX.Element => {
  return (
    <div
      className="py-6 px-6 border-r rounded-e-[16px] bg-white w-64"
      ref={ref}
    >
      <p className="text-2xl font-semibold">Search</p>
    </div>
  );
});

export default Search;
