export default function AccountPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">Account</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <p className="text-sm text-slate-500">Signed-in user</p>
          <p className="mt-2 text-xl font-semibold">demo.user@company.com</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">Tracking state</p>
          <p className="mt-2 text-xl font-semibold">Known identity</p>
        </div>
      </div>
    </div>
  );
}