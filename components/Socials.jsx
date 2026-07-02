import Link from "next/link";

import {
  RiLinkedinLine,
  RiGithubLine,
  RiMailLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/yashwanth-r-7855a7395",
    Icon: RiLinkedinLine,
  },
  {
    name: "Github",
    link: "https://github.com/yashwanthR1207",
    Icon: RiGithubLine,
  },
  {
    name: "Email",
    link: "mailto:yashwanth.1207.r@gmail.com",
    Icon: RiMailLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-[5px] hover:text-ink"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
