import Link from "next/link";

export default function NavigationPage() {
  return (
    <main className="page-container">
      <title>Index</title>
      <h1 className="heading-normal" style={{ color: "black" }}>
        Index
      </h1>
      <ul className="list-normal">
        <li className="list-item">
          <Link href="/me" className="body-ref">
            My Resumé
          </Link>
        </li>
        <li className="list-item">
          <Link href="/me" className="body-ref">
            My Resumé
          </Link>
        </li>
      </ul>
    </main>
  );
}
