// types/gallery.ts
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  createdAt: string;
  size?: number;
  category?: string;
  tags?: string[];
}

export interface GallerySectionProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  columns?: {
    default: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
