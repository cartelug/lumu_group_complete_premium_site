import { asset } from "./site";

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type VehicleCategory = "personal" | "executive" | "business" | "family";

export type Vehicle = {
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: "USD" | "UGX";
  mileageKm?: number;
  bodyType: "SUV" | "Sedan" | "Pickup" | "Van" | "Hatchback";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  transmission: "Automatic" | "Manual";
  condition: "Brand new" | "Foreign used" | "Local used";
  categories: VehicleCategory[];
  location: string;
  image: string;
  fallback: string;
  highlights: string[];
  description: string;
  status: "available" | "reserved" | "sold";
  featured?: boolean;
};

export type PropertyType = "Land" | "House" | "Apartment" | "Commercial" | "Rental";
export type ListingType = "buy" | "rent" | "invest" | "sell";

export type Property = {
  slug: string;
  title: string;
  type: PropertyType;
  listingType: ListingType[];
  price: number;
  currency: "USD" | "UGX";
  priceNote?: string;
  location: string;
  beds?: number;
  baths?: number;
  sizeLabel?: string;
  tenure?: string;
  amenities: string[];
  image: string;
  fallback: string;
  description: string;
  status: "available" | "reserved" | "sold";
  featured?: boolean;
};

const SUV = U("1605559424843-9e4c228bf1c2");
const SEDAN = U("1502877338535-766e1452684a");
const DARKCAR = U("1583121274602-3e2820c69888");
const PICKUP = U("1558981403-c5f9899a28bc");
const SPORTS = U("1503376780353-7e6692767b70");

export const vehicles: Vehicle[] = [
  {
    slug: "toyota-land-cruiser-v8",
    title: "Toyota Land Cruiser V8",
    make: "Toyota", model: "Land Cruiser V8", year: 2019, price: 78000, currency: "USD",
    mileageKm: 86000, bodyType: "SUV", fuel: "Diesel", transmission: "Automatic",
    condition: "Foreign used", categories: ["executive", "family"], location: "Kampala",
    image: SUV, fallback: asset("/assets/images/vehicle-suv.svg"),
    highlights: ["7 seats", "Leather interior", "4WD", "Sunroof"],
    description: "A commanding executive SUV built for comfort and upcountry capability — ideal for families and executives who want presence and reliability.",
    status: "available", featured: true,
  },
  {
    slug: "toyota-harrier",
    title: "Toyota Harrier",
    make: "Toyota", model: "Harrier", year: 2018, price: 32000, currency: "USD",
    mileageKm: 72000, bodyType: "SUV", fuel: "Petrol", transmission: "Automatic",
    condition: "Foreign used", categories: ["family", "personal"], location: "Kampala",
    image: DARKCAR, fallback: asset("/assets/images/vehicle-suv.svg"),
    highlights: ["5 seats", "Reverse camera", "Alloy wheels"],
    description: "A refined crossover that balances city comfort with everyday practicality for growing families.",
    status: "available", featured: true,
  },
  {
    slug: "mercedes-benz-c200",
    title: "Mercedes-Benz C200",
    make: "Mercedes-Benz", model: "C200", year: 2017, price: 28500, currency: "USD",
    mileageKm: 64000, bodyType: "Sedan", fuel: "Petrol", transmission: "Automatic",
    condition: "Foreign used", categories: ["executive", "personal"], location: "Kampala",
    image: SEDAN, fallback: asset("/assets/images/vehicle-sedan.svg"),
    highlights: ["Leather seats", "Cruise control", "Premium audio"],
    description: "An executive sedan that delivers German engineering and understated luxury for the daily commute.",
    status: "available", featured: true,
  },
  {
    slug: "toyota-hilux-double-cab",
    title: "Toyota Hilux Double Cab",
    make: "Toyota", model: "Hilux Double Cab", year: 2020, price: 41000, currency: "USD",
    mileageKm: 58000, bodyType: "Pickup", fuel: "Diesel", transmission: "Manual",
    condition: "Foreign used", categories: ["business"], location: "Kampala",
    image: PICKUP, fallback: asset("/assets/images/vehicle-pickup.svg"),
    highlights: ["4WD", "Tow ready", "Workhorse reliability"],
    description: "The fleet and business favourite — rugged, dependable and ready for work across any terrain.",
    status: "available", featured: true,
  },
  {
    slug: "nissan-x-trail",
    title: "Nissan X-Trail",
    make: "Nissan", model: "X-Trail", year: 2018, price: 26000, currency: "USD",
    mileageKm: 79000, bodyType: "SUV", fuel: "Petrol", transmission: "Automatic",
    condition: "Foreign used", categories: ["family", "personal"], location: "Kampala",
    image: SUV, fallback: asset("/assets/images/vehicle-suv.svg"),
    highlights: ["7 seats", "Panoramic roof", "Fuel efficient"],
    description: "A versatile family SUV with flexible seating and comfortable long-distance manners.",
    status: "available",
  },
  {
    slug: "toyota-premio",
    title: "Toyota Premio",
    make: "Toyota", model: "Premio", year: 2016, price: 16500, currency: "USD",
    mileageKm: 98000, bodyType: "Sedan", fuel: "Petrol", transmission: "Automatic",
    condition: "Foreign used", categories: ["personal"], location: "Kampala",
    image: SEDAN, fallback: asset("/assets/images/vehicle-sedan.svg"),
    highlights: ["Economical", "Spacious cabin", "Easy to maintain"],
    description: "A dependable, fuel-conscious sedan that remains one of the most trusted choices for daily driving.",
    status: "available",
  },
  {
    slug: "range-rover-sport",
    title: "Range Rover Sport",
    make: "Land Rover", model: "Range Rover Sport", year: 2019, price: 95000, currency: "USD",
    mileageKm: 61000, bodyType: "SUV", fuel: "Diesel", transmission: "Automatic",
    condition: "Foreign used", categories: ["executive"], location: "Kampala",
    image: SPORTS, fallback: asset("/assets/images/vehicle-suv.svg"),
    highlights: ["Full leather", "Air suspension", "Premium sound"],
    description: "A statement of luxury and performance for executives who expect the very best on the road.",
    status: "available", featured: true,
  },
  {
    slug: "toyota-hiace-van",
    title: "Toyota Hiace",
    make: "Toyota", model: "Hiace", year: 2017, price: 22000, currency: "USD",
    mileageKm: 120000, bodyType: "Van", fuel: "Diesel", transmission: "Manual",
    condition: "Foreign used", categories: ["business"], location: "Kampala",
    image: PICKUP, fallback: asset("/assets/images/vehicle-pickup.svg"),
    highlights: ["High capacity", "Business ready", "Proven reliability"],
    description: "The workhorse van for transport businesses, logistics and group movement.",
    status: "available",
  },
];

const HOUSE1 = U("1568605114967-8130f3a36994");
const HOUSE2 = U("1512917774080-9991f1c4c750");
const HOUSE3 = U("1600585154340-be6161a56a0c");
const HOUSE4 = U("1570129477492-45c003edd2be");
const APT = U("1502672260266-1c1ef2d93688");
const LAND = U("1500382017468-9049fed747ef");
const OFFICE = U("1486406146926-c627a92ad1ab");

export const properties: Property[] = [
  {
    slug: "modern-family-home-munyonyo",
    title: "Modern Family Home, Munyonyo",
    type: "House", listingType: ["buy"], price: 420000, currency: "USD",
    location: "Munyonyo, Kampala", beds: 4, baths: 4, sizeLabel: "25 decimals",
    tenure: "Mailo (titled)", amenities: ["Garden", "Boys' quarters", "Parking for 4", "Solar backup"],
    image: HOUSE1, fallback: asset("/assets/images/property-house.svg"),
    description: "A contemporary four-bedroom home in a quiet, secure neighbourhood — finished to a high standard and move-in ready.",
    status: "available", featured: true,
  },
  {
    slug: "luxury-villa-pool-naguru",
    title: "Luxury Villa with Pool, Naguru",
    type: "House", listingType: ["buy"], price: 680000, currency: "USD",
    location: "Naguru, Kampala", beds: 5, baths: 5, sizeLabel: "40 decimals",
    tenure: "Mailo (titled)", amenities: ["Swimming pool", "Staff quarters", "Landscaped garden", "CCTV"],
    image: HOUSE2, fallback: asset("/assets/images/property-house.svg"),
    description: "An elegant five-bedroom villa with a private pool and premium finishes in one of Kampala's most sought-after suburbs.",
    status: "available", featured: true,
  },
  {
    slug: "executive-apartment-kololo",
    title: "Executive 3-Bed Apartment, Kololo",
    type: "Apartment", listingType: ["rent", "buy"], price: 2200, currency: "USD",
    priceNote: "/ month", location: "Kololo, Kampala", beds: 3, baths: 3, sizeLabel: "180 sqm",
    amenities: ["Furnished", "Gym", "Backup power", "24/7 security"],
    image: APT, fallback: asset("/assets/images/property-apartment.svg"),
    description: "A fully furnished executive apartment in the heart of Kololo, with premium amenities and round-the-clock security.",
    status: "available", featured: true,
  },
  {
    slug: "commercial-building-industrial-area",
    title: "Commercial Building, Industrial Area",
    type: "Commercial", listingType: ["buy", "invest"], price: 1250000, currency: "USD",
    location: "Industrial Area, Kampala", sizeLabel: "1,200 sqm",
    tenure: "Leasehold", amenities: ["Ground + 3 floors", "Loading bay", "Ample parking", "Tenanted"],
    image: OFFICE, fallback: asset("/assets/images/property-commercial.svg"),
    description: "A well-positioned commercial property with strong rental income potential — ideal for investors seeking yield.",
    status: "available", featured: true,
  },
  {
    slug: "prime-land-kira",
    title: "Prime Residential Land, Kira",
    type: "Land", listingType: ["buy", "invest"], price: 95000, currency: "USD",
    location: "Kira, Wakiso", sizeLabel: "50 decimals",
    tenure: "Private Mailo (titled)", amenities: ["Fenced", "Water & power nearby", "Tarmac access", "Ready to build"],
    image: LAND, fallback: asset("/assets/images/property-land.svg"),
    description: "A titled, ready-to-build plot in a fast-appreciating neighbourhood — a strong long-term investment.",
    status: "available", featured: true,
  },
  {
    slug: "four-bedroom-bungalow-gayaza",
    title: "4-Bedroom Bungalow, Gayaza",
    type: "House", listingType: ["buy"], price: 185000, currency: "USD",
    location: "Gayaza, Wakiso", beds: 4, baths: 3, sizeLabel: "20 decimals",
    tenure: "Mailo (titled)", amenities: ["Self-contained", "Borehole", "Garden", "Gated"],
    image: HOUSE4, fallback: asset("/assets/images/property-house.svg"),
    description: "A spacious family bungalow on a generous plot, offering excellent value outside the city centre.",
    status: "available",
  },
  {
    slug: "studio-apartments-block-ntinda",
    title: "Studio Apartments Block, Ntinda",
    type: "Apartment", listingType: ["invest", "buy"], price: 540000, currency: "USD",
    location: "Ntinda, Kampala", sizeLabel: "12 units",
    tenure: "Mailo (titled)", amenities: ["Fully tenanted", "Stable income", "Managed", "Backup power"],
    image: HOUSE3, fallback: asset("/assets/images/property-apartment.svg"),
    description: "An income-generating block of twelve studio units with a strong occupancy record — turnkey for investors.",
    status: "available",
  },
  {
    slug: "townhouse-for-rent-bugolobi",
    title: "Townhouse for Rent, Bugolobi",
    type: "Rental", listingType: ["rent"], price: 1800, currency: "USD",
    priceNote: "/ month", location: "Bugolobi, Kampala", beds: 3, baths: 3, sizeLabel: "160 sqm",
    amenities: ["Furnished option", "Shared pool", "Gated community", "Security"],
    image: HOUSE3, fallback: asset("/assets/images/property-house.svg"),
    description: "A modern townhouse in a secure gated community, close to schools, offices and shopping.",
    status: "available",
  },
];

export const getVehicles = () => vehicles;
export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
export const getProperties = () => properties;
export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const featuredVehicles = () => vehicles.filter((v) => v.featured);
export const featuredProperties = () => properties.filter((p) => p.featured);
