import { SERVICES } from "@/constants";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20 pb-20 px-5">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-[40px] font-bold mb-4">
          <span className="text-gradient-primary">Services</span>
        </h1>
        <p className="text-text-secondary mb-16 text-lg">
          End-to-end delivery from concept to deployment. Choose what fits your needs.
        </p>

        {/* Services list */}
        <div className="space-y-12">
          {SERVICES.map((service, index) => (
            <div
              key={service.name}
              className="flex flex-col md:flex-row gap-6 md:items-start"
            >
              {/* Service name & description */}
              <div className="flex-1">
                <div className="text-accent-primary text-sm font-mono mb-2">0{index + 1}</div>
                <h2 className="text-2xl font-semibold text-text-primary mb-3">{service.name}</h2>
                <p className="text-text-secondary">{service.description}</p>
              </div>

              {/* Deliverables & timeline */}
              <div className="md:w-[300px] p-6 rounded-lg bg-bg-surface border border-border">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-text-primary mb-2">Deliverables</h3>
                  <ul className="space-y-1">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="text-text-secondary text-sm flex items-center gap-2">
                        <span className="text-accent-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Timeline</h3>
                  <p className="text-text-secondary text-sm">{service.timeline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-lg bg-bg-surface border border-border text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to start?</h2>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 rounded-full bg-accent-primary text-bg-base font-semibold hover:bg-[#00B8D9] transition"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </main>
  );
}
