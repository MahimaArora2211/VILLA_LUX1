import { Link } from 'react-router-dom';
import VillaSlider from './VillaSlider';
import { VILLAS } from '../data/villas';

export default function Home() {
  // Get featured villas (first 8)
  const featuredVillas = VILLAS.slice(0, 8);
  
  // Get popular villas (random selection)
  const popularVillas = VILLAS.slice(8, 16);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Dream Villa</h1>
          <p>Experience luxury vacation rentals in the world's most beautiful destinations</p>
          <Link to="/villas" className="hero-cta">
            Browse Villas Now
          </Link>
        </div>
      </section>

      {/* Featured Villas Slider */}
      <VillaSlider villas={featuredVillas} title="Featured Villas" />

      {/* Popular Villas Slider */}
      <VillaSlider villas={popularVillas} title="Popular Destinations" />

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">About VillaStay</h2>
          <div className="section-grid">
            <div className="section-content">
              <h3>Experience Luxury Vacations</h3>
              <p>
                VillaStay offers a curated collection of premium villa rentals across the world's most desirable destinations. From beachfront paradises to mountain retreats, each villa is handpicked to ensure an unforgettable vacation experience.
              </p>
              <p>
                Our commitment to excellence means every villa meets our high standards for comfort, style, and amenities. Whether you're planning a romantic getaway or a family adventure, we have the perfect villa for you.
              </p>
            </div>
            <div className="section-content">
              <h3>Why Choose VillaStay?</h3>
              <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                <li style={{ marginBottom: '15px' }}>✓ Handpicked luxury villas</li>
                <li style={{ marginBottom: '15px' }}>✓ Transparent pricing</li>
                <li style={{ marginBottom: '15px' }}>✓ 24/7 customer support</li>
                <li style={{ marginBottom: '15px' }}>✓ Secure booking process</li>
                <li style={{ marginBottom: '15px' }}>✓ Best price guarantee</li>
                <li>✓ Easy cancellation policy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="section-grid">
            <div className="section-content">
              <h3>Contact Information</h3>
              <p>
                Have questions about our villas or need assistance with your booking? Our dedicated support team is here to help.
              </p>
              <p style={{ marginTop: '20px' }}>
                <strong>Email:</strong> info@villastay.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Luxury Lane, Paradise Beach, HI 96815
              </p>
              <p style={{ marginTop: '20px' }}>
                <strong>Hours:</strong> Monday - Sunday, 8:00 AM - 10:00 PM EST
              </p>
            </div>
            <div className="section-content">
              <h3>Send us a Message</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  aria-label="Your Name"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  aria-label="Your Email"
                />
                <textarea
                  placeholder="Your Message"
                  required
                  aria-label="Your Message"
                  style={{ minHeight: '120px' }}
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
              <p style={{ fontSize: '12px', color: '#5f6368', marginTop: '10px' }}>
                We'll respond to your message within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}