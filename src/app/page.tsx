import Link from "next/link";

/**
 * Temporary index while the real pages are being built — it exists so that
 * `npm run dev` lands on something that links to everything worth looking at.
 * The real home page replaces it once its Figma frame is final.
 */
const PAGES = [
  { href: "/plans", title: "Plans", note: "Figma “Plans page ✅” — not registered" },
  { href: "/preview/free", title: "Plans · free membership", note: "same page, avatar + Upgrade in the header" },
  { href: "/preview/premium", title: "Plans · premium", note: "“Your current plan”, manage subscription" },
  { href: "/preview/player", title: "Player bench", note: "real playback, every state of the engine" },
];

export default function Home() {
  return (
    <main className="px-page-x-mobile md:px-page-x mx-auto flex min-h-screen w-full max-w-[1220px] flex-col justify-center gap-10 py-20">
      <header className="flex flex-col gap-3">
        <h1 className="type-extra-big text-white-90 m-0">Daddy Sounds</h1>
        <p className="type-body-lg text-white-60 m-0">
          Everything built so far. Resize the window to cross 768px for the 390 layout.
        </p>
      </header>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {PAGES.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="border-white-15 hover:border-white-30 hover:bg-white-02 flex flex-col gap-1 rounded-lg border px-6 py-5 transition-colors outline-none focus-visible:border-white"
            >
              <span className="type-label-18 text-white">{p.title}</span>
              <span className="type-body-md text-white-60">{p.note}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="type-body-md text-white-30 m-0">
        Components on their own: <code className="text-white-60">npm run storybook</code> → localhost:6006. The design
        system as one page: <code className="text-white-60">npm run reference</code>.
      </p>
    </main>
  );
}
