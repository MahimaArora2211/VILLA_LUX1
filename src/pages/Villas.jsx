import VillasList from '../components/VillasList';
import { VILLAS } from '../data/villas';

export default function VillasPage() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#202124' }}>
        Browse Our Luxury Villas
      </h1>
      <p style={{ fontSize: '16px', color: '#5f6368', marginBottom: '40px' }}>
        Discover {VILLAS.length} handpicked villas across the world's most beautiful destinations
      </p>

      <VillasList villas={VILLAS} />
    </div>
  );
}
