import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-sky-700">
          EducaIA
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link href="/courses">Cursos</Link>
          <Link href="/login">Acceso</Link>
        </nav>
      </div>
    </header>
  );
}
