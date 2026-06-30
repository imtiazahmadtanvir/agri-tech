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

// Reusable components
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <Link
    href={href}
    className="bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition-colors"
    aria-label={label}
  >
    <Icon size={20} />
  </Link>
);

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, children }) => (
  <li className="flex items-center">
    <Icon size={18} className="mr-3 text-primary" />
    <span className="text-gray-700">{children}</span>
  </li>
);

const FooterLink: React.FC<{ href: string; text: string }> = ({
  href,
  text,
}) => (
  <li>
    <Link
      href={href}
      className="text-gray-700 hover:text-primary transition-colors"
    >
      {text}
    </Link>
  </li>
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
    { href: "#", text: "Upcoming Events" },
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
    <footer className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Agri-Tech Logo"
                width={150}
                height={50}
              />
              <p className="text-sm text-gray-600 mt-2">
                Your reliable partner in agriculture and organic farming.
              </p>
            </div>
            <div className="flex space-x-4">
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

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <ContactItem icon={MapPin}>Dhaka, Bangladesh</ContactItem>
              <ContactItem icon={Phone}>+234-109-5685</ContactItem>
              <ContactItem icon={Mail}>agri-tech@gmail.com</ContactItem>
              <ContactItem icon={Clock}>Mon - Sat: 8:00am - 6:00pm</ContactItem>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <FooterLink key={link.text} {...link} />
              ))}
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white border border-gray-300 rounded-l-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white rounded-r-md py-2 px-4 text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>
            &copy; {currentYear ?? new Date().getFullYear()} Agri-Tech. All
            Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 sm:mt-0">
            {legalLinks.map((link) => (
              <FooterLink key={link.text} {...link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
