import GallerySection from "./GallerySection";
import { GalleryImage } from "./type/type";


// async function getGalleryImages(): Promise<GalleryImage[]> {
//   // Fetch images from your API
//   const res = await fetch(`${process.env.API_URL}/api/gallery`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return [];
//   }

//   return res.json();
// }

export default async function GalleryComponent({ images }: { images: GalleryImage[]}) {
//   const images = await getGalleryImages();

  // Sample images with your data format
  const sampleImages: GalleryImage[] = [
    {
      id: "1771330054294-0",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330136/btbvlr4lln5fmxgctlu6.jpg",
      alt: "WhatsApp Image 2026-02-10 at 4.08.13 PM.jpeg",
      title: "Beautiful Sunset",
      createdAt: "2026-02-17T12:07:34.294Z",
      size: 461380,
      category: "Nature",
      tags: ["sunset", "nature", "beach"],
    },
    {
      id: "1771330054294-1",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330137/sample2.jpg",
      alt: "Mountain Landscape",
      title: "Mountain Peak",
      createdAt: "2026-02-16T10:30:00.294Z",
      size: 523890,
      category: "Nature",
      tags: ["mountain", "landscape", "adventure"],
    },
    {
      id: "1771330054294-2",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330138/sample3.jpg",
      alt: "City Architecture",
      title: "Urban Life",
      createdAt: "2026-02-15T08:15:00.294Z",
      size: 345678,
      category: "City",
      tags: ["city", "architecture", "urban"],
    },
    {
      id: "1771330054294-3",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330139/sample4.jpg",
      alt: "Food Photography",
      title: "Delicious Cuisine",
      createdAt: "2026-02-14T14:45:00.294Z",
      size: 289012,
      category: "Food",
      tags: ["food", "dining", "restaurant"],
    },
    {
      id: "1771330054294-4",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330140/sample5.jpg",
      alt: "Event Celebration",
      title: "Corporate Event",
      createdAt: "2026-02-13T09:20:00.294Z",
      size: 678901,
      category: "Events",
      tags: ["event", "celebration", "corporate"],
    },
    {
      id: "1771330054294-5",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330141/sample6.jpg",
      alt: "Product Showcase",
      title: "New Collection",
      createdAt: "2026-02-12T11:10:00.294Z",
      size: 412345,
      category: "Products",
      tags: ["product", "showcase", "business"],
    },
    {
      id: "1771330054294-6",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330142/sample7.jpg",
      alt: "Team Meeting",
      title: "Team Collaboration",
      createdAt: "2026-02-11T16:30:00.294Z",
      size: 389012,
      category: "Team",
      tags: ["team", "meeting", "collaboration"],
    },
    {
      id: "1771330054294-7",
      url: "https://res.cloudinary.com/dqyfwfeed/image/upload/v1771330143/sample8.jpg",
      alt: "Office Space",
      title: "Modern Office",
      createdAt: "2026-02-10T13:40:00.294Z",
      size: 567890,
      category: "Office",
      tags: ["office", "workspace", "modern"],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <GallerySection
        images={images.length > 0 ? images : sampleImages}
        title="Our Gallery"
        subtitle="Explore our collection of memorable moments and achievements"
        showFilters={true}
        columns={{
          default: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        }}
      />
    </main>
  );
}
