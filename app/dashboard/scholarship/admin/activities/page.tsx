// app/admin/media/page.tsx

import MediaManager from "./components/MediaManager";




const getActivities = async()=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/media-activities/dashboard`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function MediaPage() {
 
  const result = await getActivities()

  const { resultVideo, resultGallery } = result.data;

  console.log({resultVideo: resultVideo, resultGallery: resultGallery})

  return (
    <div className="min-h-screen bg-gray-50">
      <MediaManager
        initialVideos={resultVideo}
        initialGallery={resultGallery}
      />
    </div>
  );
}