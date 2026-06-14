import React, { useRef, useEffect, useState } from 'react';

const correctOTP = '123456'; // fetched from your server

function OtpInputWithValidation({
  numberOfDigits = 6,
  otpError,
  setOtpError,
  setCode,
}) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''));

  const otpBoxReference = useRef([]);

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    setCode(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === 'Enter' && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  return (
    <article className='w-full'>
      <div
        className='grid grid-cols-6 gap-x-1.5 lg:gap-x-3'
        style={{ direction: 'ltr' }}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            type="number"
            className={`ltrDir h-[48px] px-3 text-center outline-none focus:border-2 focus:outline-none ${
              !otpError
                ? 'border border-solid border-black/10 bg-black/5'
                : 'border border-solid border-[#F3434399] bg-black/5'
            }`}
          />
        ))}
      </div>

      <small
        className={`mt-4 font-peyda-400 text-[#F34F53] ${otpError ? 'error-show' : ''}`}
      >
        {otpError}
      </small>
    </article>
  );
}

export default OtpInputWithValidation;
