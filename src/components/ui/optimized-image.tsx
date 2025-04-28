"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate a simple blur data URL if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGVhNWU5MTAiLz48L3N2Zz4=';
  
  // Reset error state if src changes
  useEffect(() => {
    setError(false);
  }, [src]);
  
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        !fill && 'inline-block',
        className
      )}
      style={!fill ? { width, height } : undefined}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            fill && 'object-cover'
          )}
          style={{
            objectFit,
            objectPosition,
          }}
          sizes={sizes}
          quality={quality}
          priority={priority}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      ) : (
        <div
          className="flex items-center justify-center bg-muted text-muted-foreground text-sm w-full h-full"
          style={{ width: '100%', height: '100%' }}
        >
          {alt || 'Image not available'}
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
