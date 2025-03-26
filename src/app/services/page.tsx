import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Video } from "@/components/Video";
import ServicesHero from "@/components/ServicesHero";
import Faq from "@/components/Faq";
import { getServicesPage } from "../../../lib/getServicesPage";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";

export default async function Services() {
  const servicesData = await getServicesPage();

  if (!servicesData) {
    return (
      <Container>
        <ServicesHero />
        <SectionTitle title="Services Not Available">
          <div>We&apos;re currently updating this section. Please check back later.</div>
        </SectionTitle>
      </Container>
    );
  }

  return (
    <Container>
      <ServicesHero />

      {servicesData.introTitle && servicesData.introText && (
        <SectionTitle preTitle="Our Services" title={servicesData.introTitle}>
          {servicesData.introText}
        </SectionTitle>
      )}

      {servicesData.expertiseTitle && servicesData.expertiseText && (
        <SectionTitle preTitle="Our Expertise" title={servicesData.expertiseTitle}>
          {servicesData.expertiseText}
        </SectionTitle>
      )}

      <SectionTitle preTitle="Lorem Ipsum Video" title="Lorem ipsum dolor sit amet consectetur">
      </SectionTitle>
      {servicesData.videoId && <Video videoId={servicesData.videoId} />}

      <SectionTitle title="Client Success Stories">
        <div>What Our Clients Say.</div>
      </SectionTitle>
      <Testimonials />

      <SectionTitle preTitle="Got Questions?" title="Frequently Asked Questions">
        <div>Find out more about our services and how we can support your business needs.</div>
      </SectionTitle>
      <Faq />

      <Cta />
    </Container>
  );
}
