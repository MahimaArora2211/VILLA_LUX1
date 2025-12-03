import { useParams, useNavigate } from 'react-router-dom';
import { VILLAS } from '../data/villas';
import BookingForm from './BookingForm';

export default function VillaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const villa = VILLAS.find(v => v.id === id);

  if (!villa) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#202124', marginBottom: '20px' }}>Villa Not Found</h1>
        <p style={{ color: '#5f6368', marginBottom: '30px' }}>
          The villa you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate('/villas')} className="btn btn-primary">
          Back to Villas
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="villa-detail">
        <div className="villa-detail-gallery">
          <img
            src={villa.images[0]}
            alt={villa.title}
            className="villa-detail-image villa-detail-main-image"
          />
          {villa.images[1] && (
            <img
              src={villa.images[1]}
              alt={`${villa.title} - View 2`}
              className="villa-detail-image"
            />
          )}
          {villa.images[2] && (
            <img
              src={villa.images[2]}
              alt={`${villa.title} - View 3`}
              className="villa-detail-image"
            />
          )}
        </div>

        <div className="villa-detail-info">
          <h1 className="villa-detail-title">{villa.title}</h1>
          <div className="villa-detail-location">
            📍 {villa.location}
          </div>
          <div className="villa-detail-price">
            ${villa.price} per night
          </div>

          <p className="villa-detail-description">
            {villa.description}
          </p>

          <div className="villa-detail-features">
            <div className="feature-item">
              <span className="feature-icon">🛏️</span>
              <div>
                <strong>Bedrooms</strong>
                <p>{villa.bedrooms}</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <div>
                <strong>Rating</strong>
                <p>4.8 / 5 (128 reviews)</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏊</span>
              <div>
                <strong>Amenities</strong>
                <p>{villa.amenities.length} included</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>Premium area</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '15px', fontSize: '16px', color: '#202124' }}>Amenities</h3>
            <div className="amenities-list">
              {villa.amenities.map((amenity, index) => (
                <span key={index} className="amenity-badge">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="download-images">
            <h3>Download Villa Images</h3>
            <div className="image-download-grid">
              {villa.images.map((image, index) => (
                <div key={index} className="image-download-item">
                  <img
                    src={image}
                    alt={`${villa.title} - Image ${index + 1}`}
                    className="image-download-thumb"
                  />
                  <a
                    href={image}
                    download={`${villa.title.replace(/\s+/g, '_')}_image_${index + 1}.jpg`}
                    className="download-btn"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BookingForm villa={villa} />
    </div>
  );
}
