import React from 'react';

const SectionWrapper = ({
  children,
  backgroundColor = 'transparent',
  hasCircleBackground = false,
  circlePosition = 'right',
  className = '',
  ...props
}) => {
  const getBackgroundClass = () => {
    if (backgroundColor === 'light') return 'bg-blue-50';
    if (backgroundColor === 'white') return 'bg-white';
    if (backgroundColor === 'gray') return 'bg-gray-50';
    return '';
  };

  const getCirclePositionClass = () => {
    if (circlePosition === 'left') return 'left-0 -translate-x-1/2';
    if (circlePosition === 'center') return 'left-1/2 -translate-x-1/2';
    return 'right-0 translate-x-1/2';
  };

  return (
    <section
      className={`relative py-20 px-6 overflow-hidden ${getBackgroundClass()} ${className}`}
      {...props}
    >
      {hasCircleBackground && (
        <div className={`absolute w-96 h-96 rounded-full bg-blue-500/5 top-1/2 -translate-y-1/2 ${getCirclePositionClass()}`} />
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
}; export default SectionWrapper;
