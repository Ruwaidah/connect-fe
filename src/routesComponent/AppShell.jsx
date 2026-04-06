export default function AppShell({ children }) {
  return (
    <div className="min-h-screen w-full
  bg-[url('/assets/bg-003.png')] bg-cover bg-center
  pt-16 pb-[84px]">      <div className="min-h-screen w-full flex justify-center">
        <div className="w-full max-w-[420px] min-h-screen flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}