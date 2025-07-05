"use client";

import { useEffect } from 'react';

interface GoogleAdsProps {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function GoogleAdsComponent({ 
  slot, 
  format = "auto", 
  style = { display: 'block' },
  className = ""
}: GoogleAdsProps) {
  useEffect(() => {
    try {
      // Push the ad to AdSense
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ads-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-2541871874971595"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

// Sidebar Ad Component (300x600 - Large Rectangle)
export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 ${className}`}>
      <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
      <GoogleAdsComponent
        slot="XXXXXXXXXX" // Replace with your ad slot ID
        style={{ 
          display: 'block',
          width: '300px',
          height: '600px'
        }}
      />
    </div>
  );
}

// Rectangle Ad Component (336x280 - Large Rectangle)
export function RectangleAd({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 ${className}`}>
      <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
      <GoogleAdsComponent
        slot="XXXXXXXXXX" // Replace with your ad slot ID
        style={{ 
          display: 'block',
          width: '336px',
          height: '280px'
        }}
      />
    </div>
  );
}

// Square Ad Component (300x250 - Medium Rectangle)
export function SquareAd({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 ${className}`}>
      <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
      <GoogleAdsComponent
        slot="XXXXXXXXXX" // Replace with your ad slot ID
        style={{ 
          display: 'block',
          width: '300px',
          height: '250px'
        }}
      />
    </div>
  );
}