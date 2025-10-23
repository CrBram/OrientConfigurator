export function Navigation() {
  return (
    <nav className="px-6 py-6 pb-1 md:px-8 lg:px-12 xl:px-16">
      <div className="flex items-center justify-between">
        <img src="/orient-seeklogo.png" alt="Orient" className="h-6 md:h-8" />
        <div>
          <p className="font-semibold text-xs text-secondary-foreground">
            Made by <span className="text-accent">Bram C.</span>
          </p>
        </div>
      </div>
      <div
        className="mt-4 h-[1px]"
        style={{
          backgroundColor: "#6F6C6C",
          opacity: 0.5,
        }}
      />
    </nav>
  );
}
