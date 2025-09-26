import React, { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handelPhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handelPhoneSubmit = (event) => {
    event.preventDefault();

    // phone validations

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    // call BE API
    // show OTP Field
    setShowOtpField(true);
  };

  const onOtpSubmit = (otp) => {
    //call BE for 
    console.log("login")
  }

  return (
    <div>
      {!showOtpField ? (
        <form onSubmit={handelPhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handelPhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;