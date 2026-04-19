type TBtnProps = {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  children: React.ReactNode;
};

const TBtn = ({ onClick, isActive, title, children }: TBtnProps) => (
  <button
    type="button"
    onMouseDown={e => {
      e.preventDefault(); // keep editor focused
      onClick();
    }}
    title={title}
    className={`flex h-7 min-w-7 items-center justify-center rounded px-1.5 text-[13px] transition-colors ${
      isActive
        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`}
  >
    {children}
  </button>
);

export default TBtn;
