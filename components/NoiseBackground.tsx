// Alternative implementation using React component
// This creates a small noise SVG in memory and applies it as
// a background - no external file needed!

// /components/NoiseBackground.js
import React from 'react';

export default function NoiseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <svg 
        className="opacity-[0.03] w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            numOctaves="3" 
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
