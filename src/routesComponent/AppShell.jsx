// AppShell.jsx
export default function AppShell({ children }) {
  return (
    <div className="min-h-screen w-full bg-[url('/assets/bg-003.png')] bg-cover bg-center">
      <div className="min-h-screen w-full flex justify-center">
        {/* This is your phone-frame width */}
        <div className="w-full max-w-[420px] min-h-screen flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}