"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";

// Define TypeScript interfaces
interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface ContactItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
}

interface NewsPostProps {
  imageSrc: string;
  title: string;
  date: string;
}

// Social media link component for reusability
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <Link
    href={href}
    className="bg-yellow-400 text-[#0a4a1c] rounded-full p-2 hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-[#0a4a1c]"
    aria-label={label}
  >
    <Icon size={16} aria-hidden="true" />
    <span className="sr-only">{label}</span>
  </Link>
);

// Contact item component for reusability
const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, children }) => (
  <li className="flex items-start">
    <Icon
      size={18}
      className="mr-2 mt-1 flex-shrink-0 text-yellow-400"
      aria-hidden="true"
    />
    <span className="text-sm">{children}</span>
  </li>
);

// News post component for reusability
const NewsPost: React.FC<NewsPostProps> = ({ imageSrc, title, date }) => (
  <div className="flex">
    <div className="w-16 h-16 mr-2 flex-shrink-0 overflow-hidden rounded-sm">
      <Image
        src={imageSrc || "/blog-post-7-300x300.webp"}
        width={64}
        height={64}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <div>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-xs text-gray-300">{date}</p>
    </div>
  </div>
);

export default function Footer() {
  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Youtube, label: "YouTube" },
  ];

  const quickLinks = [
    { href: "#", text: "Learn About Us" },
    { href: "#", text: "Services We Provide" },
    { href: "#", text: "Recent Projects" },
    { href: "#", text: "Our Partners" },
    { href: "#", text: "Up Coming Events" },
  ];

  const legalLinks = [
    { href: "#", text: "Confidentiality & Privacy" },
    { href: "#", text: "Legal Information" },
    { href: "#", text: "Return and Refund Policy" },
  ];
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="relative bg-[#0a4a1c] text-white">
      {/* Grass pattern at top */}
      <div
        className="w-full h-4 bg-repeat-x bg-top"
        style={{
          backgroundImage: "url('/placeholder.svg?height=16&width=100')",
          backgroundSize: "auto 16px",
        }}
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Top section with logo and tagline */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="mr-2">
              <div className="bg-yellow mx-auto rounded-sm">
                {/* <div className="w-6 h-6 relative">
                  <div
                    className="absolute inset-0 bg-green-700 rounded-sm"
                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                    aria-hidden="true"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-yellow-400 font-bold">AT</div>
                </div> */}
                <Image
                  src="/Web-logo/footer.png" // Ensure this file exists in the public folder
                  width={40}
                  height={50}
                  alt="Agri-Tech Logo"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Agri-Tech</h2>
              <p className="text-xs text-gray-300">
                Agriculture and Organic Farm
              </p>
            </div>
          </div>

          <p className="text-center text-sm md:text-base">
            Farm of laughter and happiness!
          </p>

          <div className="flex space-x-2">
            {socialLinks.map((link) => (
              <SocialLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Contact Us!
            </h3>
            <ul className="space-y-3">
              <ContactItem icon={MapPin}> Dhaka,Bangladesh</ContactItem>
              <ContactItem icon={Phone}>Call us: +234-109-5685</ContactItem>
              <ContactItem icon={Mail}>Mail: agri-tech@gmail.com</ContactItem>
              <ContactItem icon={Clock}>
                Mon - Sat: 8:00am - 18:00pm
              </ContactItem>
            </ul>
          </div>

          {/* News Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              News Posts
            </h3>
            <div className="space-y-4">
              <NewsPost
                imageSrc="/FooterImage/footer-img1.webp"
                title="FMAC Business Center Continues to Deliver"
                date="25 May 2023"
              />
              <NewsPost
                imageSrc="/FooterImage/footer-img2.webp"
                title="Organic Farm Business Crop Insurance"
                date="21 May 2023"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-yellow-400 transition-colors focus:outline-none focus:text-yellow-400"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Subscribe Newsletter
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <label htmlFor="email-input" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Email address*"
                  className="w-full bg-white/10 border border-white/20 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="bg-yellow-400 text-[#0a4a1c] rounded-md py-2 px-4 text-sm font-medium hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-[#0a4a1c]"
                >
                  Subscribe Now!
                </button>
                <div className="ml-2 flex items-center justify-center bg-yellow-400 text-[#0a4a1c] rounded-md w-10 h-10">
                  <Mail size={20} aria-hidden="true" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/20 pt-4 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-300">
          <p>
            Copyright © {currentYear || "loading..."} Agri-Tech. All Rights
            Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4 sm:mt-0">
            {legalLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="hover:text-white transition-colors focus:outline-none focus:text-white"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Background farm image */}
      <div
        className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <Image
            src="/placeholder.svg"
            width={400}
            height={400}
            alt="Placeholder"
            className="object-cover"
          />
        </div>
      </div>
    </footer>
  );
}
