import { cn } from "@/lib/utils";

export function PortraitIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 520"
      role="img"
      aria-label="Illustrated portrait of Annamalai wearing sunglasses and a dark hoodie"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="portrait-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5CCB2A" />
          <stop offset="0.58" stopColor="#48B916" />
          <stop offset="1" stopColor="#008744" />
        </linearGradient>
        <pattern id="portrait-dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#00391C" opacity="0.12" />
        </pattern>
        <linearGradient id="hoodie" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#0C0C0C" />
        </linearGradient>
        <linearGradient id="skin" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#C58A5F" />
          <stop offset="1" stopColor="#9B603B" />
        </linearGradient>
      </defs>

      <rect width="420" height="520" fill="url(#portrait-bg)" />
      <rect width="420" height="520" fill="url(#portrait-dots)" />

      <circle cx="210" cy="212" r="156" fill="#FFE52B" />
      <circle cx="210" cy="212" r="156" fill="none" stroke="#151515" strokeWidth="5" />

      <g fill="#FFFDF2" opacity="0.9">
        <circle cx="58" cy="92" r="10" />
        <circle cx="80" cy="82" r="15" />
        <circle cx="102" cy="94" r="9" />
        <circle cx="344" cy="134" r="9" />
        <circle cx="364" cy="124" r="13" />
        <circle cx="382" cy="138" r="7" />
      </g>

      <path
        d="M123 314c-8-88 22-154 87-154s95 66 87 154v72H123v-72Z"
        fill="#0B0B0B"
      />
      <path
        d="M180 285h60v67c0 20-13 33-30 33s-30-13-30-33v-67Z"
        fill="url(#skin)"
      />
      <path
        d="M40 520c4-100 48-160 116-180h108c68 20 112 80 116 180H40Z"
        fill="url(#hoodie)"
      />
      <path
        d="M156 340c10 46 27 68 54 68s44-22 54-68"
        fill="none"
        stroke="#333333"
        strokeWidth="17"
        strokeLinecap="round"
      />

      <ellipse cx="210" cy="238" rx="85" ry="99" fill="url(#skin)" />
      <circle cx="124" cy="242" r="15" fill="#A96B43" />
      <circle cx="296" cy="242" r="15" fill="#A96B43" />

      <path
        d="M124 235c-8-94 29-132 86-132s94 38 86 132c-10-51-37-72-86-72s-76 21-86 72Z"
        fill="#141414"
      />
      <path
        d="M135 190c15-52 41-70 75-70 36 0 64 20 78 72-24-14-48-21-76-21-29 0-54 7-77 19Z"
        fill="#1F1F1F"
      />

      <g>
        <rect x="140" y="210" width="58" height="38" rx="11" fill="#0A0A0A" />
        <rect x="222" y="210" width="58" height="38" rx="11" fill="#0A0A0A" />
        <rect x="196" y="224" width="28" height="7" rx="3" fill="#0A0A0A" />
        <path d="M134 218h8M280 218h8" stroke="#0A0A0A" strokeWidth="7" strokeLinecap="round" />
        <rect x="150" y="218" width="15" height="6" rx="3" fill="#4A4A4A" opacity="0.85" />
        <rect x="232" y="218" width="15" height="6" rx="3" fill="#4A4A4A" opacity="0.85" />
      </g>

      <path
        d="M210 252c-4 12-8 20-3 25 4 4 11 3 15-1"
        fill="none"
        stroke="#7F4A2C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M190 296c13 10 28 10 41 0"
        fill="none"
        stroke="#5C3320"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <circle cx="296" cy="268" r="6" fill="#FFE52B" stroke="#151515" strokeWidth="2" />

      <path
        d="M192 351c-5 29-4 52 3 73M228 351c5 29 4 52-3 73"
        fill="none"
        stroke="#FFFDF2"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="195" cy="426" r="4.5" fill="#FFFDF2" />
      <circle cx="225" cy="426" r="4.5" fill="#FFFDF2" />
      <path
        d="M150 466c40 14 80 14 120 0"
        fill="none"
        stroke="#343434"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <g transform="translate(132 422) rotate(-10)">
        <path
          d="M12 0 15.5 8l8.5.6-6.5 5.4 2.1 8.3L12 17.6 4.4 22.3l2.1-8.3L0 8.6 8.5 8 12 0Z"
          fill="#FFE52B"
          stroke="#151515"
          strokeWidth="2"
        />
      </g>

      <g transform="translate(320 430) rotate(8)">
        <rect x="0" y="0" width="54" height="27" rx="3" fill="#FFFDF2" stroke="#151515" strokeWidth="2.5" />
        <path d="M8 9h37M8 17h24" stroke="#008744" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
