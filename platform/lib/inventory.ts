import { site } from "./site";

// Owner-editable inventory. Edit this data, never the layout.
// `verified` gates the VERIFIED grade stamp; `status` drives the card state.
// Images are intentional placeholders (see CarFigure) until real sets arrive.

export type Currency = "UGX" | "USD";
export type Condition = "new" | "used" | "import";
export type Status = "available" | "reserved" | "sold";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  paint: string; // hex, drives the placeholder figure
  paintName: string;
  mileageKm: number;
  price: number; // UGX
  priceUsd?: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  bodyType: "SUV" | "Saloon" | "Hatchback" | "Pickup" | "Van";
  condition: Condition;
  grade?: string; // Japanese auction grade, only when verified
  verified: boolean;
  importRoute?: string[];
  keyFeatures: string[];
  status: Status;
  featured?: boolean;
};

export const inventory: Car[] = [
  {
    id: "subaru-forester-2018",
    make: "Subaru", model: "Forester", year: 2018, plate: "UBL 482K",
    paint: "#2f3a46", paintName: "Sepia Bronze",
    mileageKm: 78412, price: 62000000, priceUsd: 16500,
    transmission: "Automatic", fuel: "Petrol", bodyType: "SUV",
    condition: "import", grade: "4.5", verified: true,
    importRoute: ["Yokohama", "Mombasa", "Kampala"],
    keyFeatures: ["Symmetrical AWD", "EyeSight assist", "Reverse camera", "Sunroof"],
    status: "available", featured: true,
  },
  {
    id: "toyota-landcruiser-prado-2016",
    make: "Toyota", model: "Land Cruiser Prado", year: 2016, plate: "UBK 207M",
    paint: "#e7e4dd", paintName: "Pearl White",
    mileageKm: 112300, price: 138000000, priceUsd: 36800,
    transmission: "Automatic", fuel: "Diesel", bodyType: "SUV",
    condition: "import", grade: "4", verified: true,
    importRoute: ["Nagoya", "Mombasa", "Kampala"],
    keyFeatures: ["3.0L turbo-diesel", "7 seats", "Leather", "Diff lock"],
    status: "available", featured: false,
  },
  {
    id: "mazda-demio-2017",
    make: "Mazda", model: "Demio", year: 2017, plate: "UAX 915J",
    paint: "#a8321e", paintName: "Soul Red",
    mileageKm: 64980, price: 29500000, priceUsd: 7850,
    transmission: "Automatic", fuel: "Petrol", bodyType: "Hatchback",
    condition: "import", grade: "4.5", verified: true,
    importRoute: ["Yokohama", "Mombasa", "Kampala"],
    keyFeatures: ["SkyActiv 1.3L", "Push start", "Low mileage", "Economical"],
    status: "reserved", featured: false,
  },
  {
    id: "nissan-xtrail-2015",
    make: "Nissan", model: "X-Trail", year: 2015, plate: "UBG 640H",
    paint: "#1f2933", paintName: "Diamond Black",
    mileageKm: 98750, price: 54000000, priceUsd: 14400,
    transmission: "Automatic", fuel: "Petrol", bodyType: "SUV",
    condition: "import", grade: "4", verified: true,
    importRoute: ["Osaka", "Mombasa", "Kampala"],
    keyFeatures: ["7 seats", "All-mode 4x4", "Panoramic roof"],
    status: "available", featured: false,
  },
  {
    id: "mercedes-c200-2014",
    make: "Mercedes-Benz", model: "C200", year: 2014, plate: "UAW 333F",
    paint: "#4a5560", paintName: "Tenorite Grey",
    mileageKm: 86400, price: 71000000, priceUsd: 18900,
    transmission: "Automatic", fuel: "Petrol", bodyType: "Saloon",
    condition: "import", grade: "4.5", verified: true,
    importRoute: ["Southampton", "Mombasa", "Kampala"],
    keyFeatures: ["AMG line", "Leather", "Reverse camera", "UK import"],
    status: "available", featured: false,
  },
  {
    id: "toyota-hiace-2013",
    make: "Toyota", model: "Hiace", year: 2013, plate: "UBD 712C",
    paint: "#e7e4dd", paintName: "Super White",
    mileageKm: 154200, price: 86000000, priceUsd: 22900,
    transmission: "Manual", fuel: "Diesel", bodyType: "Van",
    condition: "import", verified: false,
    keyFeatures: ["2.5L diesel", "15-seater", "Fleet ready"],
    status: "available", featured: false,
  },
];

export const getCars = () => inventory;
export const getCar = (id: string) => inventory.find((c) => c.id === id);
export const featuredCar = () => inventory.find((c) => c.featured) ?? inventory[0];
export const otherCars = () => inventory.filter((c) => !c.featured);

export const fmtUGX = (n: number) =>
  n >= 1_000_000 ? `UGX ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M` : `UGX ${n.toLocaleString()}`;
export const fmtUSD = (n?: number) => (n ? `$${n.toLocaleString()}` : "");
export const fmtKm = (n: number) => `${n.toLocaleString()} km`;

export function carTitle(c: Car) {
  return `${c.year} ${c.make} ${c.model}`;
}

export function carWhatsApp(c: Car) {
  const msg = `Hi Lumu, I'm interested in the ${carTitle(c)} (${c.plate}) listed at ${fmtUGX(c.price)}. Is it still available?`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}
