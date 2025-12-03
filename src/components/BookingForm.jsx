import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidPhone, isValidGmail, nightsBetweenDates } from '../utils/validators';
import { getSession, saveBookingDetails } from '../utils/auth';

export default function BookingForm({ villa }) {
  const navigate = useNavigate();
  const session = getSession();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const nights = nightsBetweenDates(formData.checkInDate, formData.checkOutDate);
  const totalPrice = nights > 0 ? nights * villa.price : 0;

  const today = new Date().toISOString().split('T')[0];

  // Full form validation
  const validateFormData = useMemo(() => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!isValidPhone(formData.phone)) newErrors.phone = 'Phone must be exactly 10 digits';
    if (!isValidGmail(formData.email)) newErrors.email = 'Email must be a valid Gmail address (@gmail.com)';
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required';

    if (formData.checkInDate && formData.checkOutDate) {
      if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
        newErrors.dates = 'Check-in date must be before check-out date';
      }
    }

    if (nights < 1 && (formData.checkInDate || formData.checkOutDate)) {
      newErrors.nights = 'Please select valid dates with at least 1 night';
    }

    return newErrors;
  }, [formData, nights]);

  const isFormValid = Object.keys(validateFormData).length === 0;

  // Real-time input validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Reset check-out if check-in becomes invalid
      if (name === 'checkInDate' && updated.checkOutDate) {
        if (new Date(updated.checkInDate) >= new Date(updated.checkOutDate)) {
          updated.checkOutDate = '';
        }
      }

      return updated;
    });

    // Update errors for the changed field
    setErrors((prev) => {
      let fieldError = '';

      switch (name) {
        case 'fullName':
          if (!value.trim()) fieldError = 'Full name is required';
          break;
        case 'phone':
          if (!isValidPhone(value)) fieldError = 'Phone must be exactly 10 digits';
          break;
        case 'email':
          if (!isValidGmail(value)) fieldError = 'Email must be a valid Gmail address (@gmail.com)';
          break;
        case 'checkInDate':
          if (!value) fieldError = 'Check-in date is required';
          break;
        case 'checkOutDate':
          if (!value) fieldError = 'Check-out date is required';
          break;
        default:
          break;
      }

      return { ...prev, [name]: fieldError };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!session) {
      setMessage('Please sign in to make a booking');
      navigate('/signin');
      return;
    }

    if (!isFormValid) {
      setErrors(validateFormData);
      return;
    }

    const bookingData = {
      customer: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },
      villa: {
        id: villa.id,
        title: villa.title,
        location: villa.location,
        image: villa.images[0],
        pricePerNight: villa.price,
      },
      dates: {
        checkIn: formData.checkInDate,
        checkOut: formData.checkOutDate,
        nights: nights,
      },
      totalPrice: totalPrice,
    };

    saveBookingDetails(bookingData);
    navigate('/payment');
  };

  return (
    <div className="booking-form">
      <h2>Book This Villa</h2>

      <div className="price-summary">
        <div className="price-row">
          <span>${villa.price} per night</span>
          <span>× {nights > 0 ? nights : '0'} nights</span>
        </div>
        {nights > 0 && (
          <div className="price-row total">
            <span>Total Price</span>
            <span>${totalPrice}</span>
          </div>
        )}
      </div>

      {message && (
        <div className="auth-message error" style={{ marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            aria-label="Full Name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <span className="form-error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="1234567890"
            aria-label="Phone Number"
            aria-invalid={!!errors.phone}
            inputMode="numeric"
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@gmail.com"
            aria-label="Email Address"
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label htmlFor="checkInDate">Check-in Date *</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              aria-label="Check-in Date"
              aria-invalid={!!errors.checkInDate}
              min={today}
            />
            {errors.checkInDate && <span className="form-error">{errors.checkInDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="checkOutDate">Check-out Date *</label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              aria-label="Check-out Date"
              aria-invalid={!!errors.checkOutDate}
              min={formData.checkInDate || today}
            />
            {errors.checkOutDate && <span className="form-error">{errors.checkOutDate}</span>}
          </div>
        </div>

        {errors.dates && (
          <div className="form-error" style={{ display: 'block', marginBottom: '15px' }}>
            {errors.dates}
          </div>
        )}
        {errors.nights && (
          <div className="form-error" style={{ display: 'block', marginBottom: '15px' }}>
            {errors.nights}
          </div>
        )}

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
