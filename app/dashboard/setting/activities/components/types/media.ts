export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  createdAt: string;
  status: "published" | "draft";
}

export interface GalleryImage {
  _id?: string;
  id: string;
  url: string;
  alt: string;
  title?: string;
  createdAt: string;
  size?: number;
}

export type TabType = "video" | "gallery";
