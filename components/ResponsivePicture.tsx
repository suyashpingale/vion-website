import React from 'react';

/**
 * Prop structure for the ResponsivePicture component.
 * Ensures strict typing for the three required viewport assets.
 */
export interface ResponsivePictureProps {
    /** The asset to display on screens >= 1280px */
    desktopSrc: string;
    /** The asset to display on screens >= 640px and < 1280px */
    tabletSrc: string;
    /** The fallback asset to display on screens < 640px */
    mobileSrc: string;
    /** Accessible description of the image content */
    alt?: string;
    /** Global classnames passed to the picture wrapper */
    className?: string;
    /** Optional classnames passed down to the img element itself */
    imgClassName?: string;
}

/**
 * ResponsivePicture
 * 
 * Renders an HTML5 <picture> element that natively handles viewport-based art direction
 * via <source> tags, preventing the browser from downloading multiple hidden images.
 */
const ResponsivePicture: React.FC<ResponsivePictureProps> = ({
    desktopSrc,
    tabletSrc,
    mobileSrc,
    alt = "VION Biological Interface",
    className = "relative flex w-full h-full items-center justify-center pointer-events-none",
    imgClassName = "w-full h-auto object-contain transition-opacity duration-1000 ease-in-out"
}) => {
    return (
        <picture className={className}>
            {/* Desktop / Laptop (1280px and above) */}
            <source media="(min-width: 1280px)" srcSet={desktopSrc} />

            {/* Tablet (640px to 1279px) */}
            <source media="(min-width: 640px)" srcSet={tabletSrc} />

            {/* Mobile (Fallback / Base) */}
            <img
                src={mobileSrc}
                alt={alt}
                className={imgClassName}
                loading="lazy"
            />
        </picture>
    );
};

export default ResponsivePicture;
