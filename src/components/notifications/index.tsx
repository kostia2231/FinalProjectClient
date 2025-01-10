import { forwardRef } from "react";

const Notifications = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      className="py-6 px-6 border-r rounded-e-[16px] bg-white w-64"
      ref={ref}
    >
      <p className="text-2xl font-semibold">Notifications</p>
    </section>
  );
});

export default Notifications;
