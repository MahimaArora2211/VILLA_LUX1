import { Link } from 'react-router-dom';

export default function VillaCard({ villa }) {
  return (
    <div className="villa-card">
      <img src={villa.images[0]} alt={villa.title} className="villa-card-image" />
      <div className="villa-card-content">
        <h3 className="villa-card-title">{villa.title}</h3>
        <p className="villa-card-location">📍 {villa.location}</p>
        <div className="villa-card-details">
          <span>🛏️ {villa.bedrooms} bed{villa.bedrooms !== 1 ? 's' : ''}</span>
        </div>
        <p className="villa-card-price">${villa.price}/night</p>
        <Link
          to={`/villas/${villa.id}`}
          className="villa-card-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}