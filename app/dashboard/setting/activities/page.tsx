// app/admin/media/page.tsx

import MediaManager from "./components/MediaManager";


const getActivities = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/media-activities/dashboard`,
      { cache: "no-store" },
    );

    const json = await res.json();

    return (
      json ?? {
        data: { resultVideo: [], resultGallery: [] },
      }
    );
  } catch {
    return {
      data: { resultVideo: [], resultGallery: [] },
    };
  }
};

export default async function MediaPage() {
  const result = await getActivities();

  const resultVideo = result?.data?.resultVideo ?? [];
  const resultGallery = result?.data?.resultGallery ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <MediaManager
        initialVideos={resultVideo}
        initialGallery={resultGallery}
      />
    </div>
  );
}
