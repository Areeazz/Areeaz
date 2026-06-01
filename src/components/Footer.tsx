export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-12 md:px-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <p className="text-[13px] font-medium tracking-[0.01em] text-white/58">
          Website designed &amp; developed by Areeaz
        </p>

        <div className="flex items-center gap-3 text-[12px] text-white/38">
          <a
            href="https://www.instagram.com/mullenix_/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent pb-0.5 transition duration-300 hover:border-white/30 hover:text-white/65"
          >
            Instagram
          </a>
          <span aria-hidden="true" className="text-white/22">
            &bull;
          </span>
          <a
            href="https://x.com/Areeaz"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent pb-0.5 transition duration-300 hover:border-white/30 hover:text-white/65"
          >
            X
          </a>
          <span aria-hidden="true" className="text-white/22">
            &bull;
          </span>
          <a
            href="https://github.com/Areeazz"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent pb-0.5 transition duration-300 hover:border-white/30 hover:text-white/65"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
