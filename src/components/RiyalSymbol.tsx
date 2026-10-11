import React from 'react';

interface RiyalSymbolProps {
  className?: string;
  size?: number | string;
}

/**
 * Official Saudi Riyal Currency Symbol (ر.س / SAMA official symbol)
 * High-fidelity vector rendition matching the attached riyal-symbol.svg
 */
export const RiyalSymbol: React.FC<RiyalSymbolProps> = ({ 
  className = "w-3.5 h-3.5 inline-block align-baseline shrink-0", 
  size 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1100"
      fill="currentColor"
      aria-label="ريال سعودي"
      role="img"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Official SAMA / Unicode 06FD Symbol Geometry */}
      {/* Left Column Stem */}
      <path d="M 390 85 L 470 5 L 470 655 L 350 690 L 350 375 L 320 385 L 320 220 L 390 195 Z" />
      {/* Left Column Lower Tail / Hook */}
      <path d="M 350 730 L 470 695 L 470 850 L 320 900 L 230 850 L 280 740 L 350 780 Z" />
      {/* Right Column Stem */}
      <path d="M 640 85 L 720 5 L 720 780 L 590 820 L 590 220 L 640 200 Z" />
      {/* Upper Slanted Cross Bar */}
      <path d="M 170 610 L 250 510 L 920 300 L 900 440 Z" />
      {/* Lower Slanted Cross Bar */}
      <path d="M 110 765 L 190 665 L 900 445 L 880 585 Z" />
      {/* Bottom Sub-Stroke (Standalone Right Dash) */}
      <path d="M 590 920 L 860 835 L 835 955 L 590 1030 Z" />
    </svg>
  );
};

export default RiyalSymbol;
