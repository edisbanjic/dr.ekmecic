import { buildLlmsTxt } from "@/lib/llms";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  return new Response(await buildLlmsTxt({ full: true }), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
