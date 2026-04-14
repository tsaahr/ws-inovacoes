import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAdminLeads } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { leads, error } = await getAdminLeads();

  return (
    <main className="min-h-svh bg-background">
      <AdminDashboard leads={leads} error={error} />
    </main>
  );
}
