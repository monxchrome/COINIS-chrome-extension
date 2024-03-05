import React, { useEffect } from "react";
import Welcome from "../components/Welcome/Welcome";
import { useTheme } from "../hooks/useTheme";

const WelcomePage = () => {
  const {setTheme} = useTheme();

  useEffect(() => {
    // Run the setTheme function only once when the component mounts
    setTheme('light');
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <Welcome />
    </div>
  );
};

export default WelcomePage;
