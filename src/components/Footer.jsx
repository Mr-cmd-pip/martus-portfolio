import { siteData } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {siteData.brand.fullName} · {siteData.brand.location}
        </p>
        <a
          href="#top"
          className="inline-flex min-h-10 items-center self-start font-medium text-muted transition-colors hover:text-accent sm:self-auto"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}
