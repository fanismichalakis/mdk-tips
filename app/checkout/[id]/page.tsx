"use client";
import { Checkout } from "@moneydevkit/nextjs";
import { use } from "react";

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { id } = use(params);

  return <Checkout id={id} />;
}