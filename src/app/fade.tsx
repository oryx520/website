"use client";
import React, { useState, useEffect, ReactNode} from 'react';

interface FadingTextProps {
    children: ReactNode;  // Explicitly type the children prop
    delay?: number;  // Optional delay prop with default value
  }

  const Fade: React.FC<FadingTextProps> = ({ children, delay = 1000 }) => {
    const [fadeIn, setFadeIn] = useState(false);
  
    useEffect(() => {
      const fadeTimer = setTimeout(() => {
        setFadeIn(true);
      }, delay);
      
      return () => clearTimeout(fadeTimer); // Cleanup the timer
    }, [delay]); // Added delay as a dependency
  
    const fadeStyle = {
      opacity: fadeIn ? 1 : 0,
      transition: 'opacity 1s ease-in'
    };
  
    return (
      <div style={fadeStyle}>
        {children}
      </div>
    );
};
  export default Fade;