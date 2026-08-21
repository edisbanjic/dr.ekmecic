import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostArticle from "@/components/tips/PostArticle";
import { postMetadata } from "@/lib/metadata";
import { getPost, getPosts } from "@/lib/posts";

// Static + ISR: published slugs prerender at build; new ones render once on
// demand and are then CDN-cached. Admin post actions revalidate on change.
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata(await getPost(slug), "bs");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostArticle locale="bs" post={post} />;
}
