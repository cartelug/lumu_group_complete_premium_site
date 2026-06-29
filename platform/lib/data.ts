export type Service = {
  slug: string;
  title: string;
  icon: string;
  category: string;
  short: string;
  description: string;
  includes: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "repairs-servicing",
    title: "Repairs & Servicing",
    icon: "wrench",
    category: "Repairs",
    short: "Mechanical repairs and scheduled servicing for all makes.",
    description:
      "From routine service to major mechanical repairs, our qualified technicians keep your vehicle running safely and reliably — for private cars, SUVs, trucks and company fleets.",
    includes: ["Full mechanical repairs", "Scheduled / mileage servicing", "Suspension & steering", "Honest inspection reports"],
    featured: true,
  },
  {
    slug: "computerized-diagnostics",
    title: "Computerized Diagnostics",
    icon: "diagnostics",
    category: "Diagnostics",
    short: "Accurate computer fault-finding with modern scan tools.",
    description:
      "We use computerized diagnostic equipment to find the real problem fast — no guesswork. You get a clear explanation of what's wrong and what it will cost before any work begins.",
    includes: ["Full system scan", "Engine light / fault codes", "Sensor & electrical checks", "Clear written quote first"],
    featured: true,
  },
  {
    slug: "engine-tuning-fuel-injection",
    title: "Engine Tuning & Fuel Injection",
    icon: "gear",
    category: "Repairs",
    short: "Tuning and fuel-injection service for smoother power and economy.",
    description:
      "Restore performance and fuel economy with professional engine tuning and fuel-injection cleaning and repair, done with the right tools and genuine parts.",
    includes: ["Engine tuning", "Injector cleaning & repair", "Fuel system service", "Performance & economy check"],
    featured: true,
  },
  {
    slug: "brakes-oil-tyres-battery-ac",
    title: "Brakes, Oil, Tyres, Battery & AC",
    icon: "gauge",
    category: "Maintenance",
    short: "Everyday maintenance to keep you safe on the road.",
    description:
      "Quick, dependable routine maintenance — brakes, oil changes, tyres, batteries and air-conditioning service — using quality parts and done while you wait where possible.",
    includes: ["Brake service & pads", "Oil & filter changes", "Tyres & wheel balancing", "Battery & AC service"],
    featured: true,
  },
  {
    slug: "panel-beating-spraying",
    title: "Panel Beating & Spraying",
    icon: "spray",
    category: "Bodywork",
    short: "Bodywork, dent repair and professional spray finishing.",
    description:
      "Accident repair, dent removal and quality spray painting to bring your vehicle's body back to a clean, professional finish.",
    includes: ["Accident & dent repair", "Panel replacement", "Professional spraying", "Colour matching"],
  },
  {
    slug: "genuine-spare-parts",
    title: "Genuine Spare Parts",
    icon: "parts",
    category: "Parts",
    short: "Quality and genuine spare parts for major brands.",
    description:
      "We supply quality and genuine spare parts for Toyota, Nissan, Hino, Isuzu, Mitsubishi and more — sourced and fitted by people who know your vehicle.",
    includes: ["Genuine & quality parts", "Brand-matched components", "Supply & fitting", "Fleet parts support"],
    featured: true,
  },
  {
    slug: "generator-motorcycle-servicing",
    title: "Generator & Motorcycle Servicing",
    icon: "power",
    category: "Repairs",
    short: "Servicing and repair for generators and motorcycles.",
    description:
      "Beyond cars, we service and repair generators and motorcycles — keeping your power and your two-wheelers running when you need them.",
    includes: ["Generator service & repair", "Motorcycle servicing", "Electrical fault repair", "Maintenance plans"],
  },
  {
    slug: "fleet-logistics",
    title: "Fleet & Logistics Solutions",
    icon: "truck",
    category: "Fleet",
    short: "Service plans and logistics for company and fleet vehicles.",
    description:
      "Dedicated support for businesses, NGOs, schools and delivery operators — scheduled fleet servicing, priority turnaround and logistics solutions that keep your vehicles working.",
    includes: ["Company vehicle service plans", "Priority fleet turnaround", "School & NGO vehicles", "Logistics support"],
    featured: true,
  },
];

export const getServices = () => services;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const featuredServices = () => services.filter((s) => s.featured);
