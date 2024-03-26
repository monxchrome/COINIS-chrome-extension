import { useContext, useState } from "react";
import { createContext } from "react";
import { MouseContextType } from "../Types/MouseTypes";

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export const useMouseContext = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouseContext must be used within a MouseProvider");
  }
  return context;
};

export const MouseProvider = ({ children }: any) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  console.log(showCloseButton)

  let holdTimer: any;

  const handleMouseDown = () => {
    holdTimer = setTimeout(() => {
      setShowCloseButton(true)
    }, 2000)
  }

  const handleMouseUp = () => {
    clearTimeout(holdTimer);
  }

  const contextValue: MouseContextType = {
    showCloseButton,
    setShowCloseButton,
    handleMouseDown,
    handleMouseUp,
  };

  return (
    <MouseContext.Provider value={contextValue}>
      {children}
    </MouseContext.Provider>
  );
};
