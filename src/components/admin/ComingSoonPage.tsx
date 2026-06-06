import { Construction } from "lucide-react";

type Props = {
  title: string;
  description?: string;
};

export function ComingSoonPage({ title, description }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-energy-yellow/10 ring-1 ring-energy-yellow/30">
          <Construction className="h-7 w-7 text-energy-yellow" />
        </div>
        <h1 className="font-display text-3xl font-bold text-saiyan-white">{title}</h1>
        <p className="mt-3 text-sm text-saiyan-white/60">
          {description ?? "Ta sekcja jest w przygotowaniu. Wkrótce dostępna."}
        </p>
      </div>
    </div>
  );
}
