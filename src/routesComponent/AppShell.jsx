export default function AppShell({ children }) {
  return (
    <div
      className="h-[100dvh] w-full
        overflow-hidden
        bg-[url('/assets/bg-003.png')]
        bg-cover bg-center">
      <div className="flex h-full w-full justify-center">
        <div className="flex h-full w-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}