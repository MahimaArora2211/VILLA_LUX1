import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '../utils/auth';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // ⭐⭐⭐ ONLY NEW CODE — backend save without affecting frontend ⭐⭐⭐
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).catch(err => console.log("Save error:", err));

    // ⭐ Existing logic untouched
    const result = signInUser(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <p>Welcome back! Log in to your account</p>

      {message && (
        <div className="auth-message error">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
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

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            aria-label="Password"
            aria-invalid={!!errors.password}
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Sign In
        </button>
      </form>

      <div className="auth-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '12px', color: '#5f6368' }}>
        <strong>Demo Credentials:</strong>
        <p style={{ marginTop: '8px', marginBottom: '4px' }}>Email: demo@gmail.com</p>
        <p>Password: demo123</p>
      </div>
    </div>
  );
}
