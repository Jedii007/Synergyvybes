import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Video } from "@/components/Video";
import AboutHero from "@/components/AboutHero";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";

export default function About() {
  return (
    <Container>
      <AboutHero />
      <SectionTitle
        preTitle="Our Expertise"
        title="Custom Manufacturing Solutions"
      >
        <div>Whether you&apos;re looking for product design, prototyping, or full-scale
          production, our team offers solutions that cater to various industries.
          From small-scale custom manufacturing to large industrial projects, we
          are equipped to handle all your needs.</div>
      </SectionTitle>

      <Video videoId="your-service-video-id" />

      <SectionTitle
        preTitle="Got Questions?"
        title="Frequently Asked Questions"
      >
        <div>Find out more about our services and how we can support your business</div>
        needs.
      </SectionTitle>
      <Faq />

      <Cta />
    </Container>
  );
}
