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
    <div className="flex justify-center items-center text-white bg-[#002b5b] p-4 rounded-2xl h-[200px] w-[450px]">
      {!showOtpField ? (
        <form onSubmit={handelPhoneSubmit} className="flex justify-center items-center rounded-2xl">
          <input
            type="text"
            value={phoneNumber}
            onChange={handelPhoneNumber}
            placeholder="Enter Phone Number"
            className="px-4 py-3 text-white rounded-lg border focus:ring-2 focus:ring-blue-500 m-4"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition m-4 w-[80px]">Submit</button>
        </form>
      ) : (
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg w-full h-[130px] text-center">
          <p className="mb-4">Enter OTP sent to <span className="font-bold">{phoneNumber}</span></p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;