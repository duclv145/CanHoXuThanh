import {
  AirVent,
  Bath,
  Car,
  Check,
  Dumbbell,
  Eye,
  Refrigerator,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sun,
  UtensilsCrossed,
  Waves,
  WashingMachine,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  waves: Waves,
  dumbbell: Dumbbell,
  sun: Sun,
  car: Car,
  shield: ShieldCheck,
  sofa: Sofa,
  utensils: UtensilsCrossed,
  washing: WashingMachine,
  air: AirVent,
  eye: Eye,
  smartphone: Smartphone,
  wifi: Wifi,
  fridge: Refrigerator,
  bath: Bath,
  check: Check,
};

export function AmenityIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = MAP[name] ?? Check;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
