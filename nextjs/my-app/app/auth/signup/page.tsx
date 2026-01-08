"use client"

import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              Sign up
            </div>

            <div className="pt-2">
              <LabelledInput
                label="Username"
                placeholder="harkirat@gmail.com"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <LabelledInput
                label="Password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setUsername(e.target.value)}
              />

              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
                onClick={() => {

                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type, value, onChange }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
