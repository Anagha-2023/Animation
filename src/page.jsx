import React, { useState, useRef } from 'react';

const Page = () => {
  const initialText = "5 to 6 hours.";
  const remainingWords = "That's the average time you'll spend on your phone today — often without realizing. It's time to fight back.".split(" ");
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [allowNormalScroll, setAllowNormalScroll] = useState(false);
  const containerRef = useRef(null);

  const handleWheel = (e) => {
    const isScrollingDown = e.deltaY > 0;
    
    if (isScrollingDown) {
      if (activeWordIndex < remainingWords.length - 1) {
        e.preventDefault();
        setActiveWordIndex(prev => prev + 1);
      } else {
        setAllowNormalScroll(true);
      }
    } else {
      // Scrolling up
      if (allowNormalScroll) {
        const isAtTop = window.scrollY === 0;
        if (isAtTop) {
          setAllowNormalScroll(false);
        }
      } else {
        e.preventDefault();
        setActiveWordIndex(prev => prev > -1 ? prev - 1 : prev);
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
        w-full h-screen flex items-center justify-center p-8 md:p-12 lg:p-16
        ${allowNormalScroll ? 'absolute' : 'fixed'}
      `}>
        <div className="max-w-4xl text-center bg-black">
          <p className="font-interphases font-medium text-4xl md:text-5xl lg:text-6xl custom-line-spacing">
            <span className="text-white">{initialText} </span>
            {remainingWords.map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-150 ease-in-out ${index <= activeWordIndex ? 'text-white' : 'text-gray-500'}`}
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
