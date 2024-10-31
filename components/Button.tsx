interface ButtonProps {
  children: React.ReactNode;
  width?: number;
  type?: "button" | "submit" | "reset";
  classNmae?: string;
  onClick?: () => void;
}

function Button({ children, width, type, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-[#FF385C] text-white rounded-xl p-2 font-bold"
      style={{ width: `${width}rem` }}
    >
      {children}
    </button>
  );
}

export default Button;
