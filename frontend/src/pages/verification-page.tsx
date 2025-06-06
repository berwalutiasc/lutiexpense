import { useState, useRef, useEffect } from 'react';
import type { FormEvent, ChangeEvent, KeyboardEvent } from 'react';

const VerificationPage = () => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [email, setEmail] = useState('user@example.com'); // Pre-filled with example or from props
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      // Auto-focus to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newDigits = [...digits];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 6) {
          newDigits[i] = pasteData[i];
        }
      }
      setDigits(newDigits);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length === 6) {
      console.log('Verification code:', code);
      // Handle verification logic here
    }
  };

  const handleResendCode = () => {
    if (countdown === 0) {
      setIsResending(true);
      console.log('Resending code to', email);
      // Resend logic here
      setCountdown(30);
      setIsResending(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Division with Video Background */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-piggy-bank-while-a-woman-looks-at-a-44738-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Lutiexpense</h1>
          <p className="text-xl text-white mb-8 text-center">
            Take control of your finances with our powerful expense tracking tools
          </p>
        </div>
      </div>

      {/* Right Division with Verification Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Verify Your Email</h2>
            <p className="text-gray-600 mt-2">
              We've sent a 6-digit code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={digits.some(d => d === '')}
                className={`w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white ${digits.some(d => d === '') ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition`}
              >
                Verify Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <button
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
                className={`font-medium ${countdown > 0 || isResending ? 'text-gray-400' : 'text-blue-600 hover:text-blue-500'}`}
              >
                {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Wrong email?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Go back
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;