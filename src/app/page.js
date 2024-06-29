"use client"
import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../app/lib/track';
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const [mouseMoves, setMouseMoves] = useState([]);
  const [buttonClicks, setButtonClicks] = useState([]);
  const timeoutIdRef = useRef(null);
  const numColumns = 12;

  const handleMouseMove = (event) => {
    const columnWidth = window.innerWidth / numColumns;
    const column = Math.floor(event.clientX / columnWidth) + 1;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      const data = {
        column,
        event: 'mousemove',
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date()
      };

      setMouseMoves(prevData => [...prevData, data]);
      trackEvent('mousemove', data);
    }, 1000); // 1 second delay
  };

  const handleButtonClick = () => {
    const eventData = { label: 'Home Page Button', timestamp: new Date() };
    setButtonClicks(prevData => [...prevData, { event: 'button_click', ...eventData }]);
    trackEvent('button_click', eventData);
  };

  useEffect(() => {
    trackEvent('page_view', { url: pathname });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [pathname]);
  return (
    <>
      <h1 className='sm:text-center text-justify px-2 xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-2xl font-semibold bg-slate-300 text-teal-700 sm:py-14 py-8'>Welcome to Next.js Custom Tracking</h1>
      <div className='container'>
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-10 mt-16'>
          <div>
            <h2 className='lg:text-3xl md:text-2xl text-lg text-teal-700  font-semibold'>Button Click Tracking Data:</h2>
            <button className='md:text-lg text-base mt-4 px-2 py-1 text-neutral-700 border-2 border-slate-300 hover:bg-neutral-700 hover:text-slate-300 hover:border-neutral-700 transition-all duration-300 ease-in-out font-medium bg-slate-300 rounded-md mb-3' onClick={handleButtonClick}>Track Button Click</button>
            <div className='h-[250px] overflow-y-scroll'>
              <pre>{JSON.stringify(buttonClicks, null, 2)}</pre>
            </div>
          </div>
          <div>
            <h2 className='lg:text-3xl md:text-2xl text-lg text-teal-700  font-semibold mb-3'>Mouse Move Tracking Data:</h2>
            <div className='h-[250px] overflow-y-scroll'>
              <pre>{JSON.stringify(mouseMoves, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}