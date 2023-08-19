"use client";

import { usePathname } from "next/navigation";

export default function Category() {
  const query = usePathname();

  console.log(query);

  return <div>Category , {`${query}`}`</div>;
}
