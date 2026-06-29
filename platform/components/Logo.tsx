export default function Logo({ sub = "Built on Trust" }: { sub?: string }) {
  return (
    <>
      <svg className="logo-mark" viewBox="0 0 44 44" aria-hidden="true">
        <defs>
          <linearGradient id="lumuMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff8a1f" />
            <stop offset="1" stopColor="#c24e00" />
          </linearGradient>
        </defs>
        <rect width="44" height="44" rx="12" fill="url(#lumuMark)" />
        <path
          d="M28 14.5a4.7 4.7 0 0 0-6.2 6.1l-7.4 7.4a1.75 1.75 0 0 0 2.5 2.5l7.4-7.4a4.7 4.7 0 0 0 6.1-6.2l-2.8 2.8-2.4-2.4 2.8-2.8z"
          fill="#fff"
        />
      </svg>
      <span className="brandtext">
        Lumu <b>Autodealers</b>
        {sub && <small>{sub}</small>}
      </span>
    </>
  );
}
