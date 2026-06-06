import { useRouterState } from "@tanstack/react-router";

/**
 * Cienki, indeterminowany pasek ładowania na górze panelu admina.
 * Pokazuje się gdy router jest w trakcie nawigacji / ładowania loaderów.
 */
export function AdminProgressBar() {
  const isLoading = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading || s.isTransitioning,
  });

  return (
    <div
      aria-hidden={!isLoading}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] overflow-hidden transition-opacity duration-200 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full w-1/3 animate-admin-progress bg-gradient-to-r from-transparent via-energy-yellow to-transparent shadow-[0_0_12px_rgba(255,214,10,0.7)]" />
    </div>
  );
}
