import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative w-full h-full justify-center items-end">
      {/* Circle Background */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-accent/20 to-accent/5 border-4 border-accent/20 rounded-full bottom-0 z-0 shadow-xl backdrop-blur-sm" />
      
      {/* Avatar Image sticking out of the top */}
      <Image
        src="/avatar.png"
        alt="avatar"
        width={737}
        height={678}
        className="translate-z-0 w-auto h-[115%] object-contain object-bottom relative z-10 drop-shadow-2xl"
      />
    </div>
  );
};

export default Avatar;
