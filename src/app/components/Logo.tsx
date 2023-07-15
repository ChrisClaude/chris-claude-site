import Image from 'next/image';

const Logo = () => (<>
  <Image
      src="/ChrisClaudeLogo_.jpeg"
      width={40}
      height={40}
      alt="Chris Claude Logo"
      className='mr-2'
    />
    <span>Chris Claude</span>
</>);

export default Logo;