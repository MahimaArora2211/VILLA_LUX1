// src/components/Payment.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingDetails, clearBookingDetails } from '../utils/auth';
import { isValidCardNumber, isValidCVV } from '../utils/validators';

export default function Payment() {
  const navigate = useNavigate();
  const bookingDetails = getBookingDetails();

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [confirmedPayment, setConfirmedPayment] = useState(null);

  if (!bookingDetails) {
    navigate('/villas');
    return null;
  }

  // Real-time validation on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') processedValue = value.replace(/\s/g, '');

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    setErrors((prev) => {
      let fieldError = '';

      switch (name) {
        case 'cardNumber':
          if (!processedValue.trim()) fieldError = 'Card number is required';
          else if (!isValidCardNumber(processedValue))
            fieldError = 'Card number must be exactly 16 digits';
          break;
        case 'cardName':
          if (!processedValue.trim()) fieldError = 'Cardholder name is required';
          break;
        case 'cvv':
          if (!processedValue.trim()) fieldError = 'CVV is required';
          else if (!isValidCVV(processedValue)) fieldError = 'CVV must be exactly 3 digits';
          break;
        default:
          break;
      }

      return { ...prev, [name]: fieldError };
    });
  };

  const getValidationErrors = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (!isValidCardNumber(formData.cardNumber))
      newErrors.cardNumber = 'Card number must be exactly 16 digits';

    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';

    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!isValidCVV(formData.cvv)) newErrors.cvv = 'CVV must be exactly 3 digits';

    return newErrors;
  };

  const isFormValid = Object.keys(getValidationErrors()).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = getValidationErrors();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const transactionId =
      'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    setConfirmedPayment({
      transactionId,
      timestamp: new Date().toLocaleString(),
    });
  };

  if (confirmedPayment) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-icon">✅</div>
        <h1>Booking Confirmed!</h1>
        <p>Your villa reservation has been successfully processed.</p>
        <div className="confirmation-details">
          <div className="confirmation-detail">
            <strong>Villa</strong>
            <span>{bookingDetails.villa.title}</span>
          </div>
          <div className="confirmation-detail">
            <strong>Location</strong>
            <span>{bookingDetails.villa.location}</span>
          </div>
          <div className="confirmation-detail">
            <strong>Check-in</strong>
            <span>{new Date(bookingDetails.dates.checkIn).toLocaleDateString()}</span>
          </div>
          <div className="confirmation-detail">
            <strong>Check-out</strong>
            <span>{new Date(bookingDetails.dates.checkOut).toLocaleDateString()}</span>
          </div>
          <div className="confirmation-detail">
            <strong>Nights</strong>
            <span>{bookingDetails.dates.nights}</span>
          </div>
          <div className="confirmation-detail">
            <strong>Guest Name</strong>
            <span>{bookingDetails.customer.name}</span>
          </div>
          <div className="confirmation-detail">
            <strong>Total Paid</strong>
            <span>${bookingDetails.totalPrice}</span>
          </div>
        </div>

        <div>
          <strong>Transaction ID:</strong>
          <div className="transaction-id">{confirmedPayment.transactionId}</div>
        </div>

        <p style={{ color: '#5f6368', fontSize: '14px', marginBottom: '30px' }}>
          Confirmation details have been sent to {bookingDetails.customer.email}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => {
              clearBookingDetails();
              navigate('/');
            }}
            className="btn btn-primary"
          >
            Return to Home
          </button>
          <button
            onClick={() => {
              clearBookingDetails();
              navigate('/villas');
            }}
            className="btn btn-secondary"
          >
            Browse More Villas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form">
      <h1>Complete Payment</h1>

      <div className="payment-section">
        <h3>Booking Summary</h3>
        <div className="payment-details">
          <div className="payment-detail-row">
            <strong>Villa</strong>
            <span>{bookingDetails.villa.title}</span>
          </div>
          <div className="payment-detail-row">
            <strong>Location</strong>
            <span>{bookingDetails.villa.location}</span>
          </div>
          <div className="payment-detail-row">
            <strong>Check-in</strong>
            <span>{new Date(bookingDetails.dates.checkIn).toLocaleDateString()}</span>
          </div>
          <div className="payment-detail-row">
            <strong>Check-out</strong>
            <span>{new Date(bookingDetails.dates.checkOut).toLocaleDateString()}</span>
          </div>
          <div className="payment-detail-row">
            <strong>Nights</strong>
            <span>
              {bookingDetails.dates.nights} × ${bookingDetails.villa.pricePerNight}/night
            </span>
          </div>
          <div className="payment-detail-row">
            <strong>Total Amount</strong>
            <span>${bookingDetails.totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="payment-section">
        <h3>Guest Information</h3>
        <div className="payment-details">
          <div className="payment-detail-row">
            <strong>Name</strong>
            <span>{bookingDetails.customer.name}</span>
          </div>
          <div className="payment-detail-row">
            <strong>Email</strong>
            <span>{bookingDetails.customer.email}</span>
          </div>
          <div className="payment-detail-row">
            <strong>Phone</strong>
            <span>{bookingDetails.customer.phone}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="payment-section">
          <h3>Payment Information</h3>

          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name *</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              aria-label="Cardholder Name"
              aria-invalid={!!errors.cardName}
            />
            {errors.cardName && <span className="form-error">{errors.cardName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              aria-label="Card Number"
              aria-invalid={!!errors.cardNumber}
              inputMode="numeric"
              maxLength="16"
            />
            {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV *</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              aria-label="CVV"
              aria-invalid={!!errors.cvv}
              inputMode="numeric"
              maxLength="3"
            />
            {errors.cvv && <span className="form-error">{errors.cvv}</span>}
          </div>

          <p
            style={{
              fontSize: '12px',
              color: '#5f6368',
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '1px solid #dadce0',
            }}
          >
            ⚠️ <strong>Security Note:</strong> This is a frontend mock payment page. Use a
            PCI-compliant payment provider for real payments.
          </p>

          <div className="button-group" style={{ marginTop: '30px' }}>
            <button
              type="button"
              onClick={() => {
                clearBookingDetails();
                navigate('/villas');
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
              Pay & Confirm (${bookingDetails.totalPrice})
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
