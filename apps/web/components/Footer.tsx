export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} EducaIA. Todos los derechos reservados.</span>
        <span>PCI DSS SAQ-A · PSD2 SCA · FUNDAE compliant</span>
      </div>
    </footer>
  );
}
