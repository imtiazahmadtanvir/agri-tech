import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneNumberInput() {
  const [value, setValue] = useState();
  console.log(value);

  return (
    <div className="border rounded-md px-1.5">
      <PhoneInput
        className=""
        international
        defaultCountry="BD"
        value={value}
        onChange={() => setValue}
      />
    </div>
  );
}
