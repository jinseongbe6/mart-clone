"use client";

import { usePathname } from "next/navigation";

export default function Category() {
  const query = usePathname();

  return <div>Category , {`${query}`}`</div>;
}
