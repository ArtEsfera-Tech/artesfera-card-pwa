"use client";

import Card from "../components/Card";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 py-8">
      <Card
        name="Arthur Bernard"
        role="CTO, ArtEsfera"
        bio="Contador de histórias e designer. Revolucionando o cruzamento entre cultura e tecnologia."
        avatar="/images/van-gogh-starry-night-1080x720.webp"
        logo="/logo.png"
        links={[
          { label: "LinkedIn", url: "https://linkedin.com/in/ber-arthur" },
          { label: "Email", url: "mailto:arthurbernard@artesfera.tech" },
          { label: "GitHub", url: "https://github.com/daedaluzz" },
          { label: "WhatsApp", url: "https://wa.me/5531992971136" },
        ]}
      />
    </div>
  );
}
