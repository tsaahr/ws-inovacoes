import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/60 px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase text-brand-blue">
            WS Inovações
          </p>
          <h1 className="text-3xl font-semibold text-brand-dark">
            Acesso administrativo
          </h1>
          <p className="text-muted-foreground">
            Entre para acompanhar leads, status e volume de captação.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
