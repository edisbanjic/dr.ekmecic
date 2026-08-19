import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostArticle from "@/components/tips/PostArticle";
import { postMetadata } from "@/lib/metadata";
import { getPost } from "@/lib/posts";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata(await getPost(slug), "en");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostArticle locale="en" post={post} />;
}
