import React from 'react';
import { SocialPlatform } from '../types';

interface PlatformIconProps {
  platform: SocialPlatform;
  className?: string;
  size?: number;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  platform, 
  className = "w-3.5 h-3.5", 
  size 
}) => {
  const style = size ? { width: size, height: size } : undefined;

  switch (platform) {
    case 'tiktok':
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={className} 
          style={style}
          aria-label="تيك توك"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.35 0 .68.06 1 .16V9.45a6.37 6.37 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.87a8.28 8.28 0 0 0 4.77 1.48v-3.4a4.85 4.85 0 0 1-1-.26z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className} 
          style={style}
          aria-label="انستغرام"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={className} 
          style={style}
          aria-label="يوتيوب"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'snapchat':
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={className} 
          style={style}
          aria-label="سناب شات"
        >
          <path d="M12.003 2c-3.528 0-5.753 2.502-5.753 5.437 0 .807.24 1.83.336 2.184.096.345-.192.516-.48.696-.336.213-.864.552-1.392 1.344-.672 1.008-.432 2.136.288 2.616.48.312.912.408 1.152.48.144.048.24.168.216.312-.048.24-.264.984-.816 1.392-.624.456-1.488.744-1.992 1.152-.336.264-.456.648-.312 1.032.168.456.6.648 1.08.648.864 0 1.968-.576 3.048-.744.432-.072.84-.024 1.224.12.936.336 2.112 1.32 4.692 1.32s3.756-.984 4.692-1.32c.384-.144.792-.192 1.224-.12 1.08.168 2.184.744 3.048.744.48 0 .912-.192 1.08-.648.144-.384.024-.768-.312-1.032-.504-.408-1.368-.696-1.992-1.152-.552-.408-.768-1.152-.816-1.392-.024-.144.072-.264.216-.312.24-.072.672-.168 1.152-.48.72-.48.96-1.608.288-2.616-.528-.792-1.056-1.131-1.392-1.344-.288-.18-.576-.351-.48-.696.096-.354.336-1.377.336-2.184C17.756 4.502 15.531 2 12.003 2z"/>
        </svg>
      );
    case 'x':
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className={className} 
          style={style}
          aria-label="إكس"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
  }
};

export default PlatformIcon;
