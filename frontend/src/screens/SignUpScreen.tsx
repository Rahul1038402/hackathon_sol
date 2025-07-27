import React, { useState, useEffect } from 'react';
import { Store, User as UserIcon, ArrowLeft, Eye, EyeOff, Phone, Mail, MapPin, Package } from 'lucide-react';
import './LoginScreen.css';

interface SignUpScreenProps {
  userType: string;
  setCurrentScreen: (screen: string) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ userType, setCurrentScreen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
    businessName: '',
    location: '',
    gstNumber: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
    businessName: '',
    location: '',
    gstNumber: '',
    agreeToTerms: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Show success message and redirect to login instead of dashboard
      alert('Account created successfully! Please login with your credentials.');
      setCurrentScreen('login');
    }
  };

  useEffect(() => {
    const nameValid = signUpData.name.length >= 2;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
    const phoneValid = /^\d{10}$/.test(signUpData.phone);
    const passwordValid = signUpData.password.length >= 10;
    const confirmPasswordValid = signUpData.password === signUpData.confirmPassword && signUpData.confirmPassword.length > 0;
    const usernameValid = signUpData.username.length >= 3;
    const businessNameValid = userType === 'supplier' ? signUpData.businessName.length >= 2 : true;
    const locationValid = signUpData.location.length >= 2;
    const gstNumberValid = userType === 'supplier' ? signUpData.gstNumber.length >= 15 : (signUpData.gstNumber.length === 0 || signUpData.gstNumber.length >= 15);
    const termsValid = signUpData.agreeToTerms;
    
    setErrors({
      name: nameValid || !signUpData.name ? '' : 'Name must be at least 2 characters',
      email: emailValid || !signUpData.email ? '' : 'Please enter a valid email',
      phone: phoneValid || !signUpData.phone ? '' : 'Phone must be 10 digits',
      password: passwordValid || !signUpData.password ? '' : 'Password must be at least 10 characters',
      confirmPassword: confirmPasswordValid || !signUpData.confirmPassword ? '' : 'Passwords do not match',
      username: usernameValid || !signUpData.username ? '' : 'Username must be at least 3 characters',
      businessName: businessNameValid || !signUpData.businessName ? '' : 'Business name must be at least 2 characters',
      location: locationValid || !signUpData.location ? '' : 'Location must be at least 2 characters',
      gstNumber: gstNumberValid || !signUpData.gstNumber ? '' : 'GST number must be 15 characters',
      agreeToTerms: termsValid ? '' : 'You must agree to terms and conditions'
    });
    
    setIsFormValid(nameValid && emailValid && phoneValid && passwordValid && confirmPasswordValid && usernameValid && businessNameValid && locationValid && gstNumberValid && termsValid);
  }, [signUpData, userType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setSignUpData(prev => ({ ...prev, phone: numericValue }));
    } else if (name === 'gstNumber') {
      const alphanumericValue = value.replace(/[^A-Za-z0-9]/g, '').slice(0, 15).toUpperCase();
      setSignUpData(prev => ({ ...prev, gstNumber: alphanumericValue }));
    } else if (type === 'checkbox') {
      setSignUpData(prev => ({ ...prev, [name]: checked }));
    } else {
      setSignUpData(prev => ({ ...prev, [name]: value }));
    }
  };

  const SignUpForm = () => (
    <div className="signup-two-column-container">
      {/* Left Column - Form Header and Basic Info */}
      <div className="signup-left-column">
        <div className="form-card signup-form">
          <div className="glass-effect"></div>
          <div className="glass-tint"></div>
          <div className="glass-shine"></div>
          <div className="glass-content">
              <div className="form-header">
                <button 
                  onClick={() => setCurrentScreen('login')} 
                  className="back-button"
                  type="button"
                >
                  <ArrowLeft className="icon" />
                </button>
                <h2 className="signup-header-title">
                  {userType === 'vendor' ? 'Vendor Registration' : 'Supplier Registration'}
                </h2>
              </div>            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-group">
                <div className="input-container">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <UserIcon className="input-icon" />
                    <input 
                      type="text" 
                      name="name"
                      value={signUpData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required 
                      className={errors.name ? 'error' : ''}
                    />
                  </div>
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <div className="input-container">
                  <label>Username</label>
                  <div className="input-with-icon">
                    <UserIcon className="input-icon" />
                    <input 
                      type="text" 
                      name="username"
                      value={signUpData.username}
                      onChange={handleInputChange}
                      placeholder="Choose a unique username"
                      required 
                      className={errors.username ? 'error' : ''}
                    />
                  </div>
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>

              <div className="form-group">
                <div className="input-container">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail className="input-icon" />
                    <input 
                      type="email" 
                      name="email"
                      value={signUpData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required 
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <div className="input-container">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone className="input-icon" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={signUpData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10 digit phone number"
                      pattern="\d{10}"
                      maxLength={10}
                      required 
                      className={errors.phone ? 'error' : ''}
                    />
                  </div>
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Business Info, Location, and Security */}
      <div className="signup-right-column">
        <div className="form-card signup-form">
          <div className="glass-effect"></div>
          <div className="glass-tint"></div>
          <div className="glass-shine"></div>
          <div className="glass-content">
            <form onSubmit={handleSignUp} className="auth-form" noValidate>
              {/* Business Information Section */}
              {userType === 'supplier' && (
                <div className="form-section">
                  <h3 className="section-title">Business Information</h3>
                  
                  <div className="form-group">
                    <div className="input-container">
                      <label>Business Name</label>
                      <div className="input-with-icon">
                        <Store className="input-icon" />
                        <input 
                          type="text" 
                          name="businessName"
                          value={signUpData.businessName}
                          onChange={handleInputChange}
                          placeholder="Enter your business name"
                          required 
                          className={errors.businessName ? 'error' : ''}
                        />
                      </div>
                    </div>
                    {errors.businessName && <span className="error-message">{errors.businessName}</span>}
                  </div>

                  <div className="form-group">
                    <div className="input-container">
                      <label>GST Number</label>
                      <div className="input-with-icon">
                        <Package className="input-icon" />
                        <input 
                          type="text" 
                          name="gstNumber"
                          value={signUpData.gstNumber}
                          onChange={handleInputChange}
                          placeholder="Enter 15-digit GST number (mandatory)"
                          maxLength={15}
                          required 
                          className={errors.gstNumber ? 'error' : ''}
                        />
                      </div>
                    </div>
                    {errors.gstNumber && <span className="error-message">{errors.gstNumber}</span>}
                  </div>
                </div>
              )}

              {/* Vendor GST Section (Optional) */}
              {userType === 'vendor' && (
                <div className="form-section">
                  <h3 className="section-title">Business Information</h3>
                  
                  <div className="form-group">
                    <div className="input-container">
                      <label>GST Number (Optional)</label>
                      <div className="input-with-icon">
                        <Package className="input-icon" />
                        <input 
                          type="text" 
                          name="gstNumber"
                          value={signUpData.gstNumber}
                          onChange={handleInputChange}
                          placeholder="Enter 15-digit GST number (optional)"
                          maxLength={15}
                          className={errors.gstNumber ? 'error' : ''}
                        />
                      </div>
                    </div>
                    {errors.gstNumber && <span className="error-message">{errors.gstNumber}</span>}
                  </div>
                </div>
              )}

              {/* Location Section */}
              <div className="form-section">
                <h3 className="section-title">Location</h3>
                
                <div className="form-group">
                  <div className="input-container">
                    <label>Location</label>
                    <div className="input-with-icon">
                      <MapPin className="input-icon" />
                      <input 
                        type="text" 
                        name="location"
                        value={signUpData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your city/area"
                        required 
                        className={errors.location ? 'error' : ''}
                      />
                    </div>
                  </div>
                  {errors.location && <span className="error-message">{errors.location}</span>}
                </div>
              </div>

              {/* Security Section */}
              <div className="form-section">
                <h3 className="section-title">Security</h3>
                
                <div className="form-group">
                  <div className="input-container">
                    <label>Password</label>
                    <div className="password-input">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        name="password"
                        value={signUpData.password}
                        onChange={handleInputChange}
                        placeholder="Enter at least 10 characters"
                        minLength={10}
                        required 
                        className={errors.password ? 'error' : ''}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password"
                      >
                        {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                      </button>
                    </div>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <div className="input-container">
                    <label>Confirm Password</label>
                    <div className="password-input">
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        minLength={10}
                        required 
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="toggle-password"
                      >
                        {showConfirmPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="agreeToTerms"
                    checked={signUpData.agreeToTerms}
                    onChange={handleInputChange}
                    required 
                  />
                  I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={!isFormValid}
              >
                Create {userType === 'vendor' ? 'Vendor' : 'Supplier'} Account
              </button>

              <div className="form-footer">
                <div className="signin-link">
                  <p>
                    Already have an account?{' '}
                    <a href="#" onClick={() => setCurrentScreen('login')} className="link">
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-screen signup-screen">
      <SignUpForm />
    </div>
  );
};

export { SignUpScreen };
