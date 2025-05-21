"use client";

import Card from "../components/Card";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 py-8">
      <Card
        name="Arthur Bernard"
        role="CTO, ArtEsfera"
        bio="Especialista em IA e Big Data. Explorando o cruzamento entre cultura e tecnologia."
        avatar="/images/angelo.webp"
        logo="/logo.png"
        links={[
          { label: "LinkedIn", url: "https://linkedin.com/in/socio" },
          { label: "Email", url: "mailto:angelorodrigues@artesfera.tech" },
        ]}
      />
    </div>
  );
}
