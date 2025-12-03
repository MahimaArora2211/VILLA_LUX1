import VillaCard from './VillaCard';

export default function VillasList({ villas }) {
  return (
    <div className="villas-grid">
      {villas.map((villa) => (
        <VillaCard key={villa.id} villa={villa} />
      ))}
    </div>
  );
}