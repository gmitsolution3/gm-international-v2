"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import HotlineButton from "./components/hotlineButton";
import { UserDropdown } from "./components/DropdownMenuOnNavbar";
import { SessionUser } from "@/app/components/hideAbleNavBar/hideableNavbar";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Student",
    href: "/student-home-page",
    description:
      "Empowering students with advanced training, global exposure, and the right resources to build confidence, grow faster, and achieve their dreams with clarity and purpose.",
  },
  {
    title: "Medical",
    href: "/medical-home-page",
    description:
      "Experience world-class medical care with complete peace of mind. We arrange trusted treatment abroad with transparent guidance, reliable coordination, and personal support. Our mission is to deliver better outcomes and a stress-free medical journey for every patient.",
  },
  {
    title: "Tourist",
    href: "/tourist-home-page",
    description:
      "Discover handpicked travel experiences across China, Malaysia, and Australia, backed by trusted guidance, personalized support, and exceptional deals that make every trip smooth, enjoyable, and truly unforgettable.",
  },
  {
    title: "Business",
    href: "/business-home-page",
    description:
      "We help businesses grow with transparent guidance, dependable service, and smart solutions. Our focus is on building trust and delivering real value—every step of the journey. With us, you get support that’s reliable, honest, and built for long-term success.",
  },
  {
    title: "Visa",
    href: "/visa",
    description:
      "From document preparation to final approval, we stand by you at every stage, making your visa journey simple, secure, and completely stress-free.",
  },
  {
    title: "Umrah and Hajj",
    href: "/umrah&hajj",
    description:
      "From document preparation to final approval, we stand by you at every stage, making your visa journey simple, secure, and completely stress-free.",
  },
];

type User = {
  avatar: string;
};

export function NavBar({ session }: { session?: SessionUser | null}) {
  // const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User | undefined>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.email) {
        try {
          const user = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/get-avatar?email=${session.email}`,
            { cache: "no-store" },
          );
          const userUpdateData = await user.json();
          setUserData(userUpdateData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [session]);

  const { avatar } = userData || {};

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setExpandedMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMenu(null);
  };

  const toggleExpandMenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu
        viewport={false}
        className="hidden lg:flex max-w-11/12 mx-auto justify-around items-center py-3 border-b"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">
              <img
                src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                alt="company_logo"
                className="max-w-20"
              />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="flex-wrap gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/visa">Visa Application</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/csca">CSCA</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Find Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-75 gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="https://www.facebook.com/gminternational.live"
                      target="_blank"
                    >
                      <span className="font-medium">Facebook</span>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a
                      href="https://www.instagram.com/gminternational.live?igsh=MWF2ZHB2M25mNTkwOA=="
                      target="_blank"
                    >
                      <span className="font-medium">Instagram</span>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a
                      href="https://www.youtube.com/@gminternationalvisaagency"
                      target="_blank"
                    >
                      <span className="font-medium">Youtube</span>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <a
                      href="https://www.tiktok.com/@gminternational.live"
                      target="_blank"
                    >
                      <span className="font-medium">Tiktok</span>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* </NavigationMenuItem> */}

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/pages/about">About Us</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <HotlineButton />
          </NavigationMenuItem>
          {session?.email ? (
            <div>
              <NavigationMenuItem>
                <UserDropdown
                  email={session.email}
                  photo={avatar || undefined}
                  name={session.name || undefined}
                  role={session.userRole}
                />
              </NavigationMenuItem>
            </div>
          ) : (
            <NavigationMenuItem>
              <Link
                href="/auth/signin"
                className="rounded-md px-6 py-2 overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600 text-red-600 hover:text-white hover:bg-red-500 transition-all"
              >
                <span className="relative transition duration-300 ease">
                  Login
                </span>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile and Tablet Navigation */}
      <div className="lg:hidden border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/">
            <img
              src="https://i.postimg.cc/WbV55LZS/Group-2.png"
              alt="company_logo"
              className="max-w-16"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <HotlineButton />
            </div>
            {session?.email ? (
              <UserDropdown
                email={session.email}
                photo={avatar || undefined}
                name={session.name || undefined}
                role={session.userRole}
              />
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-sm overflow-hidden relative group cursor-pointer border-2 font-medium border-red-600 text-red-600 hover:text-white hover:bg-red-500 transition-all"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-white max-h-[calc(100vh-70px)] overflow-y-auto">
            <div className="flex flex-col">
              <MobileMenuItem href="/" label="Home" onClick={closeMobileMenu} />

              <MobileMenuItem
                href="/dashboard"
                label="Dashboard"
                onClick={closeMobileMenu}
              />

              <MobileMenuSection
                label="Services"
                isOpen={expandedMenu === "services"}
                onClick={() => toggleExpandMenu("services")}
              >
                <div className="bg-gray-50 pl-4">
                  {components.map((component) => (
                    <MobileMenuItem
                      key={component.title}
                      href={component.href}
                      label={component.title}
                      onClick={closeMobileMenu}
                      description={component.description}
                    />
                  ))}
                </div>
              </MobileMenuSection>

              <MobileMenuItem
                href="/visa"
                label="Visa Application"
                onClick={closeMobileMenu}
              />

              <MobileMenuItem
                href="/csca"
                label="CSCA"
                onClick={closeMobileMenu}
              />

              <MobileMenuSection
                label="Find Us"
                isOpen={expandedMenu === "findus"}
                onClick={() => toggleExpandMenu("findus")}
              >
                <div className="bg-gray-50 pl-4">
                  <MobileMenuItem
                    href="https://www.facebook.com/gminternational.live"
                    label="Facebook"
                    onClick={closeMobileMenu}
                    target="_blank"
                  />
                  <MobileMenuItem
                    href="https://www.instagram.com/gminternational.live?igsh=MWF2ZHB2M25mNTkwOA=="
                    label="Instagram"
                    onClick={closeMobileMenu}
                    target="_blank"
                  />
                  <MobileMenuItem
                    href="https://www.youtube.com/@gminternationalvisaagency"
                    label="Youtube"
                    onClick={closeMobileMenu}
                    target="_blank"
                  />
                  <MobileMenuItem
                    href="https://www.tiktok.com/@gminternational.live"
                    label="Tiktok"
                    onClick={closeMobileMenu}
                    target="_blank"
                  />
                </div>
              </MobileMenuSection>

              <MobileMenuItem
                href="/pages/about"
                label="About Us"
                onClick={closeMobileMenu}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function MobileMenuItem({
  href,
  label,
  onClick,
  description,
  icon,
  target,
}: {
  href: string;
  label: string;
  onClick: () => void;
  description?: string;
  icon?: React.ReactNode;
  target?: "_blank" | "_self";
}) {
  return (
    <Link href={href} onClick={onClick} target={target}>
      <div className="px-4 py-3 border-b hover:bg-red-50 transition-colors flex items-center gap-2">
        {icon}
        <div>
          <div className="font-medium text-sm">{label}</div>
          {description && (
            <div className="text-xs text-muted-foreground line-clamp-1">
              {description}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function MobileMenuSection({
  label,
  isOpen,
  onClick,
  children,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full px-4 py-3 border-b hover:bg-red-50 transition-colors flex items-center justify-between font-medium text-sm"
      >
        {label}
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && children}
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="hover:bg-red-200 border hover:border-red-300 hover:text-white p-3 rounded-md transition-colors"
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground hover:text-white line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
