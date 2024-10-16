interface ButtonProps {
  children: React.ReactNode;
  width?: number;
  type?: "button" | "submit" | "reset";
  classNmae?: string;
}

function Button({ children, width, type }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-[#FF385C] text-white rounded-lg p-2 font-bold"
      style={{ width: `${width}rem` }}
    >
      {children}
    </button>
  );
}

export default Button;
