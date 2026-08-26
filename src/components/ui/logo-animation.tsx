"use client";

export function LogoAnimation() {
  return (
    <div className="logo-animation">
      {/* Plain text - visible at start, fades out when cap appears */}
      <span className="logo-text-base">Scholar Stack</span>

      {/* Text with cap - cap drops in */}
      <span className="logo-text-with-cap">
        <span className="logo-cap-wrapper">
          <svg
            className="logo-cap"
            viewBox="0 0 44 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cap top (mortarboard) */}
            <path
              d="M22 4L2 16L22 28L42 16L22 4Z"
              fill="#12181B"
              stroke="#12181B"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Cap body */}
            <path
              d="M10 20V30C10 30 15 35 22 35C29 35 34 30 34 30V20"
              fill="none"
              stroke="#12181B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tassel string */}
            <line
              x1="36"
              y1="16"
              x2="39"
              y2="30"
              stroke="#B08D57"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Tassel end */}
            <circle cx="39" cy="32" r="2" fill="#B08D57" />
          </svg>
        </span>
        Scholar St
        <span className="logo-a-container">
          <span className="logo-letter-a">a</span>
          <span className="logo-books">
            <svg
              className="logo-book"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top book - dark */}
              <rect x="2" y="0" width="18" height="4.5" rx="1" fill="#12181B" stroke="#1F4B43" strokeWidth="0.5" />
              {/* Second book - white */}
              <rect x="1" y="5.5" width="20" height="4.5" rx="1" fill="#F6F3EC" stroke="#D4CFC5" strokeWidth="0.5" />
              {/* Third book - gold */}
              <rect x="2" y="11" width="18" height="4.5" rx="1" fill="#B08D57" stroke="#96753e" strokeWidth="0.5" />
              {/* Bottom book - black */}
              <rect x="1" y="16.5" width="20" height="4.5" rx="1" fill="#12181B" stroke="#1F4B43" strokeWidth="0.5" />
            </svg>
          </span>
        </span>
        ck
      </span>
    </div>
  );
}
