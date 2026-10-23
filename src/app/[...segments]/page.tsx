import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/kabo/site-shell";
import { pathToPage, studioSlug } from "@/lib/site-routes";

type Props = { params: Promise<{ segments: string[] }> };
const titles: Record<string, string> = {
  solutions: "Solutions", products: "Products", industries: "Industries", services: "Services", about: "Our Approach", company: "About KABO",
  procurement: "ICT and Workplace Procurement", partners: "Technology Ecosystem", support: "Support", contact: "Contact",
  rfq: "Request a Quote", configure: "Configure a Solution", architecture: "Infrastructure Architecture", investors: "Investor Enquiries",
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params;
  const route = pathToPage("/" + segments.join("/"));
  if (!route) return { title: "Not found" };
  const label = route.detail ? route.detail.replace(/-/g, " ") : titles[route.page] || route.page;
  return { title: `${label} | KABO IT Group`, description: `Explore ${label} with KABO IT Group. Infrastructure supply, technology solutions and project-specific quotations for organisations in South Africa.`, alternates: { canonical: "/" + segments.join("/") } };
}
export default async function SiteRoute({ params }: Props) {
  const { segments } = await params;
  const route = pathToPage("/" + segments.join("/"));
  if (!route) notFound();
  if (route.page === "architecture" || route.page === "case-studies") redirect(`/studio/${studioSlug(route.detail)}`);
  return <SiteShell initialPage={route.page} initialDetail={route.detail} />;
}
