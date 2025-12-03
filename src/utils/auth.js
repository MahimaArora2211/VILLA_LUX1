
// Get all users from localStorage
export const getAllUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Save all users to localStorage
export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Register a new user
export const registerUser = (userData) => {
  const users = getAllUsers();
  
  // Check if email already exists
  const emailExists = users.some(u => u.email === userData.email);
  if (emailExists) {
    return { success: false, message: 'Email already registered' };
  }
  
  // Add new user
  users.push({
    id: Date.now().toString(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    password: userData.password // In production, this should be hashed
  });
  
  saveUsers(users);
  return { success: true, message: 'User registered successfully' };
};

// Sign in user
export const signInUser = (email, password) => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }
  
  // Set session
  const sessionData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    token: 'session_' + Date.now()
  };
  
  localStorage.setItem('session', JSON.stringify(sessionData));
  return { success: true, user: sessionData };
};

// Get current session
export const getSession = () => {
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
};

// Check if user is logged in
export const isUserLoggedIn = () => {
  return getSession() !== null;
};

// Sign out user
export const signOutUser = () => {
  localStorage.removeItem('session');
};

// Save booking details temporarily for payment page
export const saveBookingDetails = (bookingData) => {
  sessionStorage.setItem('bookingDetails', JSON.stringify(bookingData));
};

// Get booking details
export const getBookingDetails = () => {
  const details = sessionStorage.getItem('bookingDetails');
  return details ? JSON.parse(details) : null;
};

// Clear booking details
export const clearBookingDetails = () => {
  sessionStorage.removeItem('bookingDetails');
};