// app/gallery/page.tsx
import Image from "next/image";

export default function Gallery() {
  // Example image list – replace with your own images
  const images = [
    { id: 1, src: "/gallery/img1.jpg", alt: "Team celebration" },
    { id: 2, src: "/gallery/img2.jpg", alt: "Fans cheering" },
    { id: 3, src: "/gallery/img3.jpg", alt: "Match action" },
    { id: 4, src: "/gallery/img4.jpg", alt: "Award ceremony" },
    { id: 5, src: "/gallery/img5.jpg", alt: "Youth academy" },
    { id: 6, src: "/gallery/img6.jpg", alt: "Community event" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Photo Gallery
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Relive the best moments of FC Tou&apos;s 25-year journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-center">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}