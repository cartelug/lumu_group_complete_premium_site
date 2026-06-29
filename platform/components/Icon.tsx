import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  wrench: <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6l-2.6 2.6-2.4-2.4 2.6-2.6z" />,
  diagnostics: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M7 11l2-2 2 3 2-4 2 3h1" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <circle cx="12" cy="14" r="1.6" />
      <path d="M12 13l3.4-3.4" />
    </>
  ),
  spray: (
    <>
      <rect x="8.5" y="9" width="7" height="12" rx="2" />
      <path d="M10.5 9V6a1.5 1.5 0 0 1 1.5-1.5A1.5 1.5 0 0 1 13.5 6v3" />
      <path d="M17 5h2M17 8h2M18.5 3v.5M18.5 9.5v.5" />
    </>
  ),
  parts: (
    <>
      <path d="M12 2.5l8 4.6v9.8L12 21.5 4 16.9V7.1z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  power: <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8z" />,
  truck: (
    <>
      <rect x="2.5" y="6.5" width="11" height="9" rx="1" />
      <path d="M13.5 9.5H17l3.5 3.5v2.5h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  star: <path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.5 6.9 19.2l1-5.8L3.6 9.3l5.8-.8z" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.2 1.8" />
    </>
  ),
  file: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 13.5l1.6 1.6 3.2-3.6" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4L19 6.5" />,
  phone: <path d="M5 4h3.5l1.8 4.4-2.2 1.6a11 11 0 0 0 5 5l1.6-2.2L19.5 19v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 2.5 5.6 1.5 1.5 0 0 1 4 4z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  handshake: <path d="M3 12l4-4 4 3 2-2 4 2 4-3v8h-4l-3 3-3-3-4 1-4-2z" />,
};

type Props = { name: string; size?: number } & SVGProps<SVGSVGElement>;

export default function Icon({ name, size = 24, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name] ?? paths.wrench}
    </svg>
  );
}
