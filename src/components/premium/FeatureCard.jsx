import React from 'react';

const FeatureCard = ({
  title,
  description,
  variant = 'plus' // 'plus' or 'pro'
}) => {
  const isPlus = variant === 'plus';

  const cardStyles = isPlus
    ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30'
    : 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30';

  return (
    <div className={`${cardStyles} rounded-xl p-6 text-white relative overflow-hidden h-full`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <p className="text-sm text-white/90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;