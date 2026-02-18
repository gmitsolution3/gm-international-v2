// types/video.ts
export interface Video {
  _id?: string;
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  createdAt: string;
  status: "published" | "draft";
  views?: number;
}

export interface VideoGalleryProps {
  videos: Video[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
}
