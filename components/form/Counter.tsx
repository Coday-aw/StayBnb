"use client";

import React, { useEffect, useState } from "react";
import { CounterProps } from "@/lib/types";

const Counter: React.FC<CounterProps> = ({ label, value, onChange }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onChange(count);
  }, [count, onChange]);

  return (
    <div className="flex justify-between m-6">
      <p className="font-bold">{label}</p>
      <div className="flex justify-center items-center gap-5">
        <button
          type="button"
          className="border px-4 rounded-lg border-gray-400 text-red-500 font-bold text-center"
          value={value}
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span>{count}</span>
        <button
          type="button"
          className="border px-4 rounded-lg border-gray-400 text-red-500 font-bold"
          value={value}
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
