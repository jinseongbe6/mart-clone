"use client";

import { SearchContents } from "./SearchContents";
import { SearchEmpty } from "./SearchEmpty";
import { useGlobalContext } from "@/context/GlobalContext";
import useSearchGoods from "@/hooks/useSearchGoodsQuery";

export default function search() {
  const ctx = useGlobalContext();
  const { data } = useSearchGoods(ctx?.search ? ctx.search : "");

  return !!data ? <SearchContents /> : <SearchEmpty />;
}
