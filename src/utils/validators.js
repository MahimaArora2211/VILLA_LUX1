// Phone validation: exactly 10 digits
export const isValidPhone = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

// Gmail validation: must end with @gmail.com
export const isValidGmail = (email) => {
  const regex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
};

// Card number validation: exactly 16 digits
export const isValidCardNumber = (cardNumber) => {
  const regex = /^\d{16}$/;
  return regex.test(cardNumber);
};

// CVV validation: exactly 3 digits
export const isValidCVV = (cvv) => {
  const regex = /^\d{3}$/;
  return regex.test(cvv);
};

// Calculate nights between two dates
export const nightsBetweenDates = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return 0;
  
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  
  const diffTime = checkOut - checkIn;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Password validation: minimum 6 characters
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};
