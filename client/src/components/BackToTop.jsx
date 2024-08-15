import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600
           text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r
            hover:from-pink-600 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-xl animate-bounce" />
        </button>
      )}
    </>
  );
}
