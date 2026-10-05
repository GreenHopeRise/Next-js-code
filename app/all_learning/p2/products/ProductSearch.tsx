"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductSearch() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      //   if (params.get("search") === search) {
      //     return;
      //   }
      route.replace(`${path}?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, route, searchParams, path]);
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";

    setSearch(currentSearch);
  }, [searchParams,]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
}
