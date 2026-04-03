import Logo from './Logo';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8">
        <Logo />
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-[bounce_1s_infinite_0ms] rounded-full bg-primary"></div>
          <div className="h-3 w-3 animate-[bounce_1s_infinite_200ms] rounded-full bg-primary"></div>
          <div className="h-3 w-3 animate-[bounce_1s_infinite_400ms] rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
