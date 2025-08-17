import Image from 'next/image';

const Logo = () => (
  <>
    <Image
      src="/ChrisClaude_logo.svg"
      width={55}
      height={55}
      alt="Chris Claude Logo"
      className="mr-2"
    />
    <span>Chris Claude</span>
  </>
);

export default Logo;
