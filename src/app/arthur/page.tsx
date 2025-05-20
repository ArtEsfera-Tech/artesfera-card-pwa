import Card from "../components/Card";
import PWAInstallButton from "../components/PWAInstallButton";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card
        name="Daedaluzz"
        role="CTO @ ArtEsfera"
        bio="Especialista em IA e Big Data. Explorando o cruzamento entre cultura e tecnologia."
        avatar="/me.jpg"
        logo="/logo.png"
        links={[
          { label: "LinkedIn", url: "https://linkedin.com/in/daedaluzz" },
          { label: "Email", url: "mailto:daedaluzz@artesfera.tech" },
          { label: "GitHub", url: "https://github.com/daedaluzz" },
        ]}
      />
      <PWAInstallButton />
    </div>
  );
}
