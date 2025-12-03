import { useRef } from 'react';
import VillaCard from './VillaCard';

export default function VillaSlider({ villas, title = 'Featured Villas' }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">Discover our most popular and luxurious villa selections</p>

        <div className="slider-container">
          <button
            onClick={() => scroll('left')}
            className="btn btn-primary"
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              padding: '0',
              minWidth: '0',
              borderRadius: '50%',
            }}
            aria-label="Scroll left"
          >
            ←
          </button>

          <div className="slider-wrapper" ref={scrollContainerRef}>
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="btn btn-primary"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              padding: '0',
              minWidth: '0',
              borderRadius: '50%',
            }}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
