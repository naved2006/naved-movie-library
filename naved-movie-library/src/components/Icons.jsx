const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function StarIcon({ size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
    </svg>
  );
}

export function HeartIcon({ size = 18, filled = false }) {
  return (
    <svg {...base} width={size} height={size} fill={filled ? "currentColor" : "none"}>
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6 5c2.2 0 3.5 1.2 4.1 2.3L12 9l1.9-1.7C14.5 6.2 15.8 5 18 5c3.3 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

export function PlusIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function SearchIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function CloseIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function LogoMark({ size = 30 }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="#FFB627" />
      <path d="M12 9.5v13l11-6.5-11-6.5z" fill="#101435" />
    </svg>
  );
}
