import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Phone, Mail, Eye, EyeOff, Check } from 'lucide-react';
import './LoginScreen.css';

interface ForgotPasswordScreenProps {
  setCurrentScreen: (screen: string) => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ setCurrentScreen }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'newPassword' | 'success'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetData, setResetData] = useState({
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    switch (step) {
      case 'phone':
        // Simulate OTP sending
        setStep('otp');
        setOtpTimer(30);
        setCanResendOtp(false);
        break;
      case 'otp':
        // Verify OTP
        setStep('newPassword');
        break;
      case 'newPassword':
        // Reset password
        setStep('success');
        break;
    }
  };

  // OTP Timer
  useEffect(() => {
    let interval: number;
    if (step === 'otp' && otpTimer > 0 && !canResendOtp) {
      interval = window.setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [step, otpTimer, canResendOtp]);

  // Form validation
  useEffect(() => {
    let isValid = false;
    
    switch (step) {
      case 'phone':
        const phoneValid = /^\d{10}$/.test(resetData.phone);
        setErrors(prev => ({
          ...prev,
          phone: phoneValid || !resetData.phone ? '' : 'Phone must be 10 digits'
        }));
        isValid = phoneValid;
        break;
      case 'otp':
        const otpValid = /^\d{6}$/.test(resetData.otp);
        setErrors(prev => ({
          ...prev,
          otp: otpValid || !resetData.otp ? '' : 'OTP must be 6 digits'
        }));
        isValid = otpValid;
        break;
      case 'newPassword':
        const passwordValid = resetData.newPassword.length >= 10;
        const confirmPasswordValid = resetData.newPassword === resetData.confirmPassword && resetData.confirmPassword.length > 0;
        setErrors(prev => ({
          ...prev,
          newPassword: passwordValid || !resetData.newPassword ? '' : 'Password must be at least 10 characters',
          confirmPassword: confirmPasswordValid || !resetData.confirmPassword ? '' : 'Passwords do not match'
        }));
        isValid = passwordValid && confirmPasswordValid;
        break;
    }
    
    setIsFormValid(isValid);
  }, [resetData, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setResetData(prev => ({ ...prev, phone: numericValue }));
    } else if (name === 'otp') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setResetData(prev => ({ ...prev, otp: numericValue }));
    } else {
      setResetData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleResendOtp = () => {
    setOtpTimer(30);
    setCanResendOtp(false);
    setResetData(prev => ({ ...prev, otp: '' }));
    // Simulate OTP resending
  };

  const updateShadow = () => {
    if (!textRef.current || !lightRef.current || !containerRef.current) return;

    const shadowConfig = {
      layers: 30,
      falloff: 1.0,
      distance: 1.5,
      color: { r: 255, g: 255, b: 255, a: 0.5 },
      blur: 27
    };

    // Set fixed light position (top-left area)
    const fixedLightX = containerRef.current.offsetWidth * 0.3;
    const fixedLightY = containerRef.current.offsetHeight * 0;
    
    lightRef.current.style.left = `${fixedLightX}px`;
    lightRef.current.style.top = `${fixedLightY}px`;

    // Calculate distance from light to text center
    const textRect = textRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const textCenterX = textRect.left - containerRect.left + textRect.width / 2;
    const textCenterY = textRect.top - containerRect.top + textRect.height / 2;
    
    const distanceX = fixedLightX - textCenterX;
    const distanceY = fixedLightY - textCenterY;

    // Generate multi-layer shadow
    let newShadow = '';
    for (let i = 0; i < shadowConfig.layers; i++) {
      const progress = i / shadowConfig.layers;
      const shadowX = -distanceX * progress * shadowConfig.distance;
      const shadowY = -distanceY * progress * shadowConfig.distance;
      const opacity = Math.pow(1 - progress, shadowConfig.falloff);

      newShadow += (newShadow ? ',' : '') +
        `${shadowX}px ${shadowY}px ${shadowConfig.blur}px rgba(${
          shadowConfig.color.r}, ${shadowConfig.color.g}, ${
          shadowConfig.color.b}, ${opacity})`;
    }
    
    textRef.current.style.textShadow = newShadow;
  };

  useEffect(() => {
    updateShadow();
    window.addEventListener('resize', updateShadow);
    return () => window.removeEventListener('resize', updateShadow);
  }, []);

  const ForgotPasswordHeader = () => (
    <div className="selection-container">
      {/* Light source element (hidden but used for calculations) */}
      <div ref={lightRef} id="light" className="light-source"></div>
      
      <div ref={textRef} className="main-title">
        Vendor Setu
      </div>
      <div className="role-title">
        <h2>Reset Your Password</h2>
        <p className="subtitle">
          {step === 'phone' && 'Enter your phone number to receive OTP'}
          {step === 'otp' && 'Enter the OTP sent to your phone'}
          {step === 'newPassword' && 'Create a new password for your account'}
          {step === 'success' && 'Password reset successful!'}
        </p>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (step) {
      case 'phone': return 'Enter Phone Number';
      case 'otp': return 'Verify OTP';
      case 'newPassword': return 'Create New Password';
      case 'success': return 'Password Reset Complete';
      default: return 'Reset Password';
    }
  };

  const getBackAction = () => {
    switch (step) {
      case 'phone': return () => setCurrentScreen('login');
      case 'otp': return () => setStep('phone');
      case 'newPassword': return () => setStep('otp');
      case 'success': return () => setCurrentScreen('login');
      default: return () => setCurrentScreen('login');
    }
  };

  const ForgotPasswordForm = () => (
    <div className="form-container">
      <div className="form-card">
        <div className="glass-effect"></div>
        <div className="glass-tint"></div>
        <div className="glass-shine"></div>
        <div className="glass-content">
          <div className="form-header">
            <button 
              onClick={getBackAction()} 
              className="back-button"
              type="button"
            >
              <ArrowLeft className="icon" />
            </button>
            <h2>{getStepTitle()}</h2>
          </div>
          
          {step !== 'success' ? (
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              {/* Step 1: Phone Number */}
              {step === 'phone' && (
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone className="input-icon" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={resetData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your registered phone number"
                      pattern="\d{10}"
                      maxLength={10}
                      required 
                      className={errors.phone ? 'error' : ''}
                    />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                  <p className="form-help-text">
                    We'll send an OTP to this number to verify your identity
                  </p>
                </div>
              )}

              {/* Step 2: OTP Verification */}
              {step === 'otp' && (
                <div className="form-group">
                  <label>Enter OTP</label>
                  <div className="input-with-icon">
                    <Mail className="input-icon" />
                    <input 
                      type="text" 
                      name="otp"
                      value={resetData.otp}
                      onChange={handleInputChange}
                      placeholder="Enter 6-digit OTP"
                      pattern="\d{6}"
                      maxLength={6}
                      required 
                      className={errors.otp ? 'error' : ''}
                    />
                  </div>
                  {errors.otp && <span className="error-message">{errors.otp}</span>}
                  <div className="otp-footer">
                    <p className="form-help-text">
                      OTP sent to +91 {resetData.phone.replace(/(\d{5})(\d{5})/, '$1*****')}
                    </p>
                    {canResendOtp ? (
                      <button 
                        type="button" 
                        onClick={handleResendOtp}
                        className="resend-otp-button"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span className="otp-timer">
                        Resend OTP in {otpTimer}s
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: New Password */}
              {step === 'newPassword' && (
                <>
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        name="newPassword"
                        value={resetData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password (min 10 characters)"
                        minLength={10}
                        required 
                        className={errors.newPassword ? 'error' : ''}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password"
                      >
                        {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                      </button>
                    </div>
                    {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <div className="password-input">
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        name="confirmPassword"
                        value={resetData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your new password"
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
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={!isFormValid}
              >
                {step === 'phone' && 'Send OTP'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'newPassword' && 'Reset Password'}
              </button>
            </form>
          ) : (
            /* Success Step */
            <div className="success-container">
              <div className="success-icon">
                <Check className="icon" />
              </div>
              <h3>Password Reset Successful!</h3>
              <p>Your password has been successfully reset. You can now login with your new password.</p>
              <button 
                onClick={() => setCurrentScreen('login')}
                className="submit-button"
              >
                Go to Login
              </button>
            </div>
          )}

          {step !== 'success' && (
            <div className="form-footer">
              <div className="signin-link">
                <p>
                  Remember your password?{' '}
                  <a href="#" onClick={() => setCurrentScreen('login')} className="link">
                    Back to Login
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="login-screen forgot-password-screen">
      <ForgotPasswordHeader />
      <ForgotPasswordForm />
      
      {/* SVG Filter for glass effects */}
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100"
            lighting-color="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
};

export { ForgotPasswordScreen };
