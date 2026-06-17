import { AuthShell } from "@/components/owner/AuthShell";
import { AuthForm } from "@/components/owner/AuthForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function Page({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale).ownerArea;
  return (
    <AuthShell
      locale={params.locale}
      title={t.registerTitle}
      subtitle={t.registerSubtitle}
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
