import { siteData } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-xs text-[#929292] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {siteData.brand.fullName} · {siteData.brand.location}
        </p>
        <a
          href="#top"
          className="inline-flex min-h-10 items-center self-start font-medium text-[#929292] transition-colors hover:text-[#647BFF] sm:self-auto"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
