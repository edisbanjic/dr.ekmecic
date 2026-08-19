import type { Metadata } from "next";
import TipsIndex from "@/components/tips/TipsIndex";
import { tipsMetadata } from "@/lib/metadata";

export const revalidate = 300;

export const metadata: Metadata = tipsMetadata("bs");

type Props = { searchParams: Promise<{ category?: string }> };

export default async function Page({ searchParams }: Props) {
  const { category } = await searchParams;
  return <TipsIndex locale="bs" category={category} />;
}
