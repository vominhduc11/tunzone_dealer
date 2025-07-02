'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}

export default function AnimationWrapper({ 
  children, 
  animation = 'animate-fade-in-up', 
  delay = 0,
  className = '' 
}: AnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            setTimeout(() => {
              element.classList.add('animate');
              element.classList.add(animation);
            }, delay);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animation, delay]);

  return (
    <div 
      ref={elementRef} 
      className={`animate-on-scroll ${className}`}
    >
      {children}
    </div>
  );
}
