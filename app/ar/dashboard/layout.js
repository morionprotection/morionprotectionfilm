import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";
import AdminShell from "@/components/Admin/AdminLayout";

export const dynamic = "force-dynamic" 

export default async function AdminLayout({ children }) {
  const supabase = await createSupabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/ar/login");
  }

  const user = session.user;

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}
