import { useState } from "react";

interface ProjectImageProps {
  imageUrl: string;
  title: string;
  className?: string;
}

export function ProjectImage({ imageUrl, title, className = "" }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Handle both base64 data URLs and file paths
  const getImagePath = (url: string) => {
    if (url.startsWith('data:')) return url;
    if (url.startsWith('http')) return url;
    return `/attached_assets/generated_images/${url}`;
  };
  
  const imageSrc = getImagePath(imageUrl);
  

  
  if (imageError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
        <br />
        <span className="text-xs text-gray-400">Path: {imageSrc}</span>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-pulse bg-gray-300 w-16 h-16 rounded"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={title}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
      />
    </div>
  );
}