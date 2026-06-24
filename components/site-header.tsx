import Link from "next/link";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <script src="https://assets.adobedtm.com/6a203c8a0ff8/aeb100c194c7/launch-cce179acef2d-development.min.js" async></script>
        {/* <script src="https://assets.adobedtm.com/e9875dd51dbe/388b9dd9eb82/launch-0197eededa87-development.min.js" async></script> */}
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          AdobeStore
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
    </header>
  );
}
