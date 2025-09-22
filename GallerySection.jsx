import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import casaImage1 from '../../assets/casa_vacanze_piscina_1.jpg';
import casaImage2 from '../../assets/casa_vacanze_piscina_2.jpg';
import spiaggia1 from '../../assets/spiaggia_fuerteventura_1.jpg';
import spiaggia2 from '../../assets/spiaggia_fuerteventura_2.jpg';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: casaImage1, alt: "Casa Magafral - Vista esterna con piscina" },
    { src: casaImage2, alt: "Casa Magafral - Villa moderna" },
    { src: spiaggia1, alt: "Spiaggia di Fuerteventura" },
    { src: spiaggia2, alt: "Costa di Fuerteventura" }
  ];

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            Galleria Fotografica
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri la bellezza di Casa Magafral e dei paesaggi mozzafiato di Fuerteventura
          </p>
        </div>

        {/* Mini Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer card-hover"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="font-montserrat font-semibold"
          >
            Vedi Tutte le Foto
          </Button>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-accent transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="font-open-sans">{selectedImage.alt}</p>
              <p className="text-sm text-white/70">{currentIndex + 1} di {images.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

