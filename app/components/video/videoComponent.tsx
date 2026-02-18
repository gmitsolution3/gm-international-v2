// app/page.tsx (or your frontpage component)

import { Video } from "./type/type";
import VideoGallery from "./VideoGallery";

// : Promise<Video[]>
async function getVideos() {
  // Fetch videos from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/media-activities/video`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function VideoGalleryComponent({
  resultVideo,
}: {
  resultVideo: Video[];
}) {
  
  const sampleVideos: Video[] = [
    {
      id: "1",
      title: "Introduction to Our Services - Complete Guide 2024",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      createdAt: "2024-01-15T10:00:00Z",
      status: "published",
      views: 15420,
    },
    {
      id: "2",
      title: "Customer Success Story: How We Helped Business Grow",
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
      createdAt: "2024-01-10T15:30:00Z",
      status: "published",
      views: 8920,
    },
    {
      id: "3",
      title: "Expert Tips and Tricks for Maximum Results",
      url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
      createdAt: "2024-01-05T09:15:00Z",
      status: "published",
      views: 23450,
    },
    {
      id: "4",
      title: "New Feature Announcement: What's Coming in 2024",
      url: "https://www.youtube.com/watch?v=6_b7RDuLwcI",
      thumbnail: "https://img.youtube.com/vi/6_b7RDuLwcI/maxresdefault.jpg",
      createdAt: "2024-01-01T12:00:00Z",
      status: "published",
      views: 32150,
    },
    {
      id: "5",
      title: "Tutorial: Getting Started in 5 Easy Steps",
      url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      thumbnail: "https://img.youtube.com/vi/2Vv-BfVoq4g/maxresdefault.jpg",
      createdAt: "2023-12-28T14:20:00Z",
      status: "published",
      views: 18760,
    },
    {
      id: "6",
      title: "Behind the Scenes: How We Build Great Products",
      url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
      createdAt: "2023-12-20T11:45:00Z",
      status: "published",
      views: 7650,
    },
  ];

  return (
    <div>
      {resultVideo.length > 0 && (
        <main>
          <VideoGallery
            videos={resultVideo.length > 0 ? resultVideo : sampleVideos}
            title="Reviews of GM International"
            subtitle="Watch our latest success stories"
            autoplay={false}
            showPagination={true}
            showNavigation={true}
          />
        </main>
      )}
    </div>
  );
}
