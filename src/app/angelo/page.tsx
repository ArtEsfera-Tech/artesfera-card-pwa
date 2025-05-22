"use client";

import Card from "../components/Card";

export default function Page() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 py-8">
      <Card
        name="Angelo Rodrigues"
        role="Co-fundador e CEO"
        bio="Educador com visão sociocultural e estratégica para projetos criativos e tecnológicos."
        bgImg="/images/the-school-of-athens-raffaello-sanzio-da-urbino720x1080.webp"
        bgImgDescription="Pintura de Eugène Delacroix - A Liberdade Guiando o Povo"
        logo="/logo.png"
        links={[
          {
            label: "LinkedIn",
            url: "https://linkedin.com/in/angeloagrodrigues",
          },
          { label: "Email", url: "mailto:angelorodrigues@artesfera.tech" },
          { label: "WhatsApp", url: "https://wa.me/5581996066502" },
        ]}
        vcf="/contacts/angelo.vcf"
      />
    </div>
  );
}
