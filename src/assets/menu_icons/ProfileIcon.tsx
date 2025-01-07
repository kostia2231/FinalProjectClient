import { SVGIconP, SvgIcon } from "../../components/svg";

export const ProfileIcon = (props: SVGIconP) => {
  return (
    <SvgIcon viewBox="0 0 25 25" {...props}>
      <rect
        x="0.5"
        y="0.5"
        width="24"
        height="24"
        rx="11.5"
        stroke="black"
        strokeOpacity="0.098"
        fill="none"
      />
    </SvgIcon>
  );
};
