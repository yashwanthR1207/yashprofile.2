import Link from "next/link";

import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

export const socialData = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/yashwanth-r-7855a7395",
    Icon: FaLinkedin,
    color: "text-[#0077b5]",
  },
  {
    name: "Github",
    link: "https://github.com/yashwanthR1207",
    Icon: FaGithub,
    color: "text-[#181717]",
  },
  {
    name: "Email",
    link: "mailto:yashwanth.1207.r@gmail.com",
    Icon: FaEnvelope,
    color: "text-[#EA4335]",
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
          className={`text-2xl ${social.color} hover:opacity-80 hover:scale-110 transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
