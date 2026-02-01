import React from "react";

/*TypeScript can't infer types across files — it needs explicit types in the component file. */
//Sets the type of the props for the Container component - react component type.
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

//Used to center components
const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

//Makes available for other files to use. 
export default Container;