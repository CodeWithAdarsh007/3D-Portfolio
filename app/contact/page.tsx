"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, POST to Formspree or your backend
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen pt-20 pb-20 px-5">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-[40px] font-bold mb-12">
          <span className="text-gradient-primary">Contact</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <p className="text-accent-primary mb-4">Get in touch</p>
            <h2 className="text-[32px] font-semibold mb-8">Let's work together</h2>

            <div className="space-y-4">
              <Link
                href="mailto:engineer.adarshpandey@gmail.com"
                className="flex items-center justify-between p-4 rounded-lg bg-bg-surface border border-border hover:border-accent-primary transition"
              >
                <span>Email</span>
                <span className="text-accent-primary">→</span>
              </Link>
              <Link
                href="https://wa.me/919653191940"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between p-4 rounded-lg bg-bg-surface border border-border hover:border-accent-primary transition"
              >
                <span>WhatsApp</span>
                <span className="text-accent-primary">→</span>
              </Link>
              <Link
                href="https://in.linkedin.com/in/adarshpandey9653"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between p-4 rounded-lg bg-bg-surface border border-border hover:border-accent-primary transition"
              >
                <span>LinkedIn</span>
                <span className="text-accent-primary">→</span>
              </Link>
              <Link
                href="https://instagram.com/adarsh_.07"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between p-4 rounded-lg bg-bg-surface border border-border hover:border-accent-primary transition"
              >
                <span>Instagram</span>
                <span className="text-accent-primary">→</span>
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="p-8 rounded-lg bg-accent-primary-soft border border-accent-primary text-center">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="text-xl font-semibold mb-2">Message sent</h3>
                <p className="text-text-secondary">I'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border focus:border-accent-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border focus:border-accent-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Company (optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border focus:border-accent-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Project type</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border focus:border-accent-primary outline-none">
                    <option>AI/ML Development</option>
                    <option>Full-Stack Web App</option>
                    <option>Admin Panel / Dashboard</option>
                    <option>Marketplace / E-commerce</option>
                    <option>Business Website</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Budget (optional)</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border focus:border-accent-primary outline-none">
                    <option>Under $2K</option>
                    <option>$2K - $5K</option>
                    <option>$5K - $10K</option>
                    <option>$10K+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-bg-surface border border-border focus:border-accent-primary outline-none resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-accent-primary text-bg-base font-semibold hover:bg-[#00B8D9] transition"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
