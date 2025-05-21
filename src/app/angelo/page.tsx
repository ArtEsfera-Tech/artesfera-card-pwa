"use client";

import Card from "../components/Card";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 py-8">
      <Card
        name="Angelo Rodrigues"
        role="CEO, ArtEsfera"
        bio="Profissional com visão cultural e estratégica para projetos criativos e tecnológicos."
        avatar="/images/eugene-delacroix-la-liberte-guidant-le-peuple-720x1080.webp"
        logo="/logo.png"
        links={[
          {
            label: "LinkedIn",
            url: "https://linkedin.com/in/angeloagrodrigues",
          },
          { label: "Email", url: "mailto:angelorodrigues@artesfera.tech" },
          { label: "WhatsApp", url: "https://wa.me/5581996066502" },
        ]}
      />
    </div>
  );
}
