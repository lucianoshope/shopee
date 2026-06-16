"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function StarPicker({ name }: { name: string }) {
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      <input type="hidden" name={name} value={value} />
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => setValue(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="text-yellow-400"
          aria-label={`${n} estrela(s)`}
        >
          <Star
            size={26}
            className={n <= (hover || value) ? "fill-yellow-400" : "fill-none text-gray-300"}
          />
        </button>
      ))}
      <span className="text-sm text-gray-500 ml-2">{value} de 5</span>
    </div>
  );
}
