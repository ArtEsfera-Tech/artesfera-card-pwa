import Card from "../components/Card";
import PWAInstallButton from "../components/PWAInstallButton";
export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card
        name="Seu Sócio"
        role="Co-fundador @ ArtEsfera"
        bio="Profissional com visão cultural e estratégica para projetos criativos e tecnológicos."
        avatar="/socio.jpg"
        logo="/logo.png"
        links={[
          { label: "LinkedIn", url: "https://linkedin.com/in/socio" },
          { label: "Email", url: "mailto:socio@artesfera.tech" },
        ]}
      />
    </div>
  );
}
