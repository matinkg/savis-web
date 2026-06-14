import React, { useEffect, useState } from "react";
type CountdownTimerProps = {
  resendOTPHandler: () => void;
  loading: {
    continuation: boolean;
    resend: boolean;
  };
};
export default function CountdownTimer({
  resendOTPHandler,
  loading,
}: CountdownTimerProps) {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    // Function to handle the countdown logic
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000); // Run this effect every 1000ms (1 second)

    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds]); // Re-run this effect whenever 'seconds' changes

  // Function to resend OTP
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
    resendOTPHandler();
  };
  return (
    <div className="countdown-text">
      {/* Display countdown timer if seconds or minutes are greater than 0 */}

      {seconds > 0 || minutes > 0 ? (
        <div className="flex justify-center gap-x-1">
          <span>ارسال مجدد</span>
          <span style={{ fontWeight: 600 }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      ) : (
        // Display if countdown timer reaches 0
        /* Button to resend OTP */

        <button
          className="font-peyda-600 text-sm"
          disabled={seconds > 0 || minutes > 0}
          style={{
            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#4D4D4D",
          }}
          onClick={resendOTP}
        >
          {/* {loading?.resend ? (
            <>
              <Spinner />
            </>
          ) : (
        <span>پیام را دریافت نکردید ؟ ارسال مجدد کد</span>
          )} */}
          پیام را دریافت نکردید ؟ ارسال مجدد کد
        </button>
      )}
    </div>
  );
}
