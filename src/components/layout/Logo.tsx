import Link from "next/link";

export default function Logo() {
  return (
    <div className="shrink-0">
      <Link href="/">
        <img
          src="/images/Skipick.svg"
          alt="Skipick"
          fetchPriority="high"
          style={{ width: "130px", height: "auto" }}
        />
      </Link>
    </div>
  );
}
