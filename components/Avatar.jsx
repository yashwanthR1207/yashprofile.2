import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative w-full h-full justify-center items-end">
      <Image
        src="/avatar.png"
        alt="avatar"
        width={737}
        height={678}
        className="translate-z-0 w-auto h-full object-contain object-bottom relative z-10"
      />
    </div>
  );
};

export default Avatar;
