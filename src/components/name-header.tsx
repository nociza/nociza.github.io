"use client";

import { useState } from "react";

interface NameHeaderProps {
  firstName: string;
  altFirstName: string;
  lastName: string;
}

export default function NameHeader({
  firstName,
  altFirstName,
  lastName,
}: NameHeaderProps) {
  const [showAlternate, setShowAlternate] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const alternateVisible = showAlternate || isPreviewing;

  return (
    <h1 className="w-full font-serif text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-neutral-900">
      <button
        type="button"
        className="block rounded-sm text-left transition-colors hover:text-orange-700 focus-visible:text-orange-700"
        aria-label={`Show ${alternateVisible ? firstName : altFirstName}`}
        aria-pressed={showAlternate}
        onClick={() => setShowAlternate((visible) => !visible)}
        onMouseEnter={() => setIsPreviewing(true)}
        onMouseLeave={() => setIsPreviewing(false)}
        onFocus={() => setIsPreviewing(true)}
        onBlur={() => setIsPreviewing(false)}
      >
        {alternateVisible ? altFirstName : firstName}
      </button>
      <span className="block">{lastName}</span>
    </h1>
  );
}
