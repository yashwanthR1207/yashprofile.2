import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative w-full h-full justify-center items-end">
      <Image
        src="/avatar_new.png"
        alt="avatar"
        fill
        sizes="(max-width: 1200px) 100vw, 50vw"
        className="translate-z-0 object-contain object-bottom relative z-10 drop-shadow-2xl"
      />
    </div>
  );
};

export default Avatar;
