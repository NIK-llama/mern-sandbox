import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length = 4,onOtpSubmit = () => {}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if(inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    },[])

    const handelChange = (index, e) => {
        const value = e.target.value
        if (isNaN(value)) return

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp)

        //submit trigger
        const combinedOtp = newOtp.join("");
        if(combinedOtp.length === length) onOtpSubmit(combinedOtp);

        // Move to next input if current field is filled
        if(value && index < length - 1 && inputRefs.current[index+1]) {
            inputRefs.current[index + 1].focus();
        }
        
    }

    const handelClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1);

        //optional 
        if(index > 0 && !otp[index-1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    }

    const handelBackSpace = (index, e) => {
        // Move to prev input if current field is keydowned/backspaced
        if(e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <div>
            {
                otp.map((value,index) => {
                    return <input className='w-[40px] h-[40px] m-[5px] text-center text-[1.2rem]' key={index} value={value} type="text"
                    ref={(input) => (inputRefs.current[index] = input)}
                    onChange={(e) => handelChange(index,e)}
                    onClick={() => handelClick(index)}
                    onKeyDown={(e) => handelBackSpace(index,e)}
                    />
                })
            }
        </div>
    )
}

export default OtpInput