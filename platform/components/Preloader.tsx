// Server component: static markup painted with the first HTML response.
// The fade-out is pure CSS (see .preloader in globals.css), so it shows
// instantly on a full page load with no flash and no JavaScript dependency.
// Client-side route changes don't remount the layout, so it never replays.
export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <svg className="preloader-mark" viewBox="0 0 44 44">
          <defs>
            <linearGradient id="preMark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff8a1f" />
              <stop offset="1" stopColor="#c24e00" />
            </linearGradient>
          </defs>
          <rect width="44" height="44" rx="12" fill="url(#preMark)" />
          <path
            d="M28 14.5a4.7 4.7 0 0 0-6.2 6.1l-7.4 7.4a1.75 1.75 0 0 0 2.5 2.5l7.4-7.4a4.7 4.7 0 0 0 6.1-6.2l-2.8 2.8-2.4-2.4 2.8-2.8z"
            fill="#fff"
          />
        </svg>
        <span className="preloader-word">
          Lumu <b>Autodealers</b>
        </span>
        <span className="preloader-bar">
          <i />
        </span>
      </div>
    </div>
  );
}
