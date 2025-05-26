"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/me");
  }, [router]);

  return (
    <div className="page-container">Well you sure have a slow internet...</div>
  );
}
