import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StudioExperience } from "@/components/flagship/studio-experience";
import { findStudioScene, STUDIO_SLUGS, type StudioSlug } from "@/components/flagship/studio-data";
import "../studio.css";

export function generateStaticParams() {
  return STUDIO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scene = findStudioScene(slug);
  if (!scene) return { title: "Studio | KABO IT Group" };
  return { title: `${scene.title} | KABO Architecture Studio`, description: `${scene.subtitle} Explore the interactive KABO solution architecture and equipment categories.` };
}

export default async function StudioRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findStudioScene(slug)) notFound();
  return <StudioExperience slug={slug as StudioSlug} />;
}
