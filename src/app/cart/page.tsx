"use client";

import { useCart } from "@/Hook/useCart";

export default function Cart() {
  const { data } = useCart();
  console.log(data);
  return <div>page</div>;
}
