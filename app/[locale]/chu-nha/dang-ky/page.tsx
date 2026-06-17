import { ComingSoon } from "@/components/layout/ComingSoon";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function Page({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return <ComingSoon title={dict.footer.ownerRegister} />;
}
