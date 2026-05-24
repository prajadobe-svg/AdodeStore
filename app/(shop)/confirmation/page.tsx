import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="container-page py-20">
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Order confirmed
        </p>
        <h1 className="mt-3 text-4xl font-bold">Thank you for your purchase</h1>
        <p className="mt-4 text-slate-600">
          This page is where a purchase event can be sent to Adobe AEP and used for
          conversion reporting and audience activation.
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}