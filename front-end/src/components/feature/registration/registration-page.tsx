import RegistrationForm from "./RegistrationForm"

export function RegistrationPage() {
  return (
    <main className="page-enter min-h-screen bg-[#f6f7fb] px-4 py-8 text-[#111111] sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <RegistrationForm />
      </div>
    </main>
  )
}
