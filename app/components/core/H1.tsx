import React, { Children } from "react";

const H1 = ({
  className,
  content,
}: {
  className?: string;
  content: string;
}) => {
  return (
    <h2 className={`text-6xl text-center font-bold font-heading  ${className}`}>
      {content}
    </h2>
  );
};

export default H1;
