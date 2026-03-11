import ServicesPricing from "./components/ServicesPricing";


export const metadata = {
  title: "GM International Services & Pricing | Study in China",
  description:
    "Comprehensive services for studying in China including university applications, visa assistance, and post-graduation support.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesPricing />
    </main>
  );
}
