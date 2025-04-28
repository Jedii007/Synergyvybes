import Hero from "@/components/Hero";
import { Container } from "@/components/Container";
import SynergyUpdates from "@/components/SynergyUpdates";

export default async function Home() {
  return (
    <Container>
      {/* Synergy Updates hidden for now
      <SynergyUpdates /> */}
      <Hero />
    </Container>
  );
}