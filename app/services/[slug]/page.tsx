import { notFound } from "next/navigation";
import ServiceDetailTemplate from "../../components/service-detail-template";
import { serviceDetails, serviceDetailSlugs } from "../service-detail-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetailSlugs.map(slug => ({ slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!serviceDetails[slug]) notFound();
  return <ServiceDetailTemplate slug={slug} />;
}
