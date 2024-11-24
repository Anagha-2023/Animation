import React, { useState, useRef } from 'react';

const Page = () => {
  const initialText = "5 to 6 hours.";
  const remainingWords = "That's the average time you'll spend on your phone today — often without realizing. It's time to fight back.".split(" ");
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [allowNormalScroll, setAllowNormalScroll] = useState(false);
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);

  const handleWheel = (e) => {
    const currentTime = Date.now();
    const isScrollingDown = e.deltaY > 0;
    
    if (!allowNormalScroll) {
      e.preventDefault();
      
      // Reduced time gap to 200ms for faster reveals
      if (isScrollingDown && currentTime - lastWheelTime.current > 200) {
        if (activeWordIndex < remainingWords.length - 1) {
          setActiveWordIndex(prev => prev + 1);
          lastWheelTime.current = currentTime;
        } else {
          setAllowNormalScroll(true);
          window.scrollTo(0, 0);
        }
      } else if (!isScrollingDown && currentTime - lastWheelTime.current > 200) {
        setActiveWordIndex(prev => prev > -1 ? prev - 1 : prev);
        lastWheelTime.current = currentTime;
      }
    } else {
      if (!isScrollingDown && window.scrollY === 0) {
        setAllowNormalScroll(false);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-[200vh]"
      onWheel={handleWheel}
    >
      <div className={`
        w-full flex items-center justify-center p-8 md:p-12 lg:p-16
        ${allowNormalScroll ? 'h-screen' : 'fixed top-1/2 left-0 -translate-y-1/2'}
      `}>
        <div className="max-w-4xl text-center bg-black">
          <p className="font-interphases font-medium text-4xl md:text-5xl lg:text-6xl custom-line-spacing">
            <span className="text-white">{initialText} </span>
            {remainingWords.map((word, index) => (
              <span
                key={index}
                className={`
                  transition-all duration-200 ease-in-out
                  ${index <= activeWordIndex ? 'text-white' : 'text-gray-600/40'}
                `}
              >
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;