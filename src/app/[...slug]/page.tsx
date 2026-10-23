import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OriginalWebsite from "../page";
import { allBusinessPaths, pathToPage } from "@/lib/site-routes";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allBusinessPaths().map(path => ({ slug: path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const route = pathToPage(path);
  if (!route) return { title: "Page not found | KABO IT Group" };
  const title = (route.detail || route.page).split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return {
    title: `${title} | KABO IT Group`,
    description: `Explore ${title.toLowerCase()} with KABO IT Group: enterprise ICT equipment, integrated infrastructure and project-specific enquiries.`,
    alternates: { canonical: path },
  };
}

export default async function BusinessRoute({ params }: Props) {
  const { slug } = await params;
  if (!pathToPage("/" + slug.join("/"))) notFound();
  return <OriginalWebsite />;
}
