// import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Video } from "@/components/Video";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Testimonials from "@/components/Testimonials";
import { Container } from "@/components/Container";

export default async function Home() {
  return (
    <Container>
      <Hero />
      {/* <Benefits />
      <Benefits /> */}

      <SectionTitle preTitle="Lorem Ipsum Video" title="Lorem ipsum dolor sit amet consectetur">
      </SectionTitle>
      <Video videoId="your-service-video-id" />

      <SectionTitle title="Client Success Stories">
        What Our Clients Say.
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="Got Questions?" title="Frequently Asked Questions">
        Find out more about our services and how we can support your business needs.
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}