import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

function Heading({ children }: HeadingProps) {
  return (
    <div>
      <h1 className="font-bold text-xl md:text-3xl sm:text-2xl">{children}</h1>
    </div>
  );
}
export default Heading;
