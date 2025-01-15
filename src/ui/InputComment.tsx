import Button from "./Button";

const InputComment = () => {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Add comment"
        className="w-full outline-none"
      />

      <Button variant="link">Send</Button>
    </div>
  );
};

export default InputComment;
