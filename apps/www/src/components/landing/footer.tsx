"use client";

import Link from "next/link";

const links = [
  { name: "About", href: "/about" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center py-8 md:flex-row md:justify-between">
          {/* Links */}
          <div className="mb-4 flex  text-sm space-x-6 md:mb-0">
            {links.map((link) => (
              <Link
                key={link.name}
                className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social + Copyright */}
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <div className="flex space-x-4">
              <a
                className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                href="https://x.com/shashivadan99"
                target="_blank"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Z" />
                </svg>
              </a>
              <a
                className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                href="https://github.com/Shashivadan/Vouch"
                target="_blank"
                aria-label="Github"
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Vouch. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
