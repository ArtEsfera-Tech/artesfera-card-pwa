"use client";

import Card from "../components/Card";
import PWAInstallButton from "../components/PWAInstallButton";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 py-8">
      <Card
        name="Arthur Bernard"
        role="CTO, ArtEsfera"
        bio="Especialista em IA e Big Data. Explorando o cruzamento entre cultura e tecnologia."
        avatar="/images/arthur.webp"
        logo="/logo.png"
        links={[
          { label: "LinkedIn", url: "https://linkedin.com/in/daedaluzz" },
          { label: "Email", url: "mailto:daedaluzz@artesfera.tech" },
          { label: "GitHub", url: "https://github.com/daedaluzz" },
        ]}
      />
    </div>
  );
}
