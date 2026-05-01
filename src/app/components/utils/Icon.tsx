export const BrandIcon = ({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <path
      d="M15 52C15 28.8 30.8 13 50 13C69.2 13 85 28.8 85 52"
      stroke="#000000"
      stroke-width="10"
      stroke-linecap="round"
      fill="none"
    />
    <rect x="8" y="50" width="18" height="28" rx="7" fill="#000000" />
    <rect x="74" y="50" width="18" height="28" rx="7" fill="#000000" />
  </svg>
);
