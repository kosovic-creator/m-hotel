import { getLocaleMessages } from "@/i18n/i18n";


export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
   const params = await searchParams;
    const lang: "en" | "sr" = params?.lang === "sr" ? "sr" : "en";
    const t = getLocaleMessages(lang, 'common');
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{t.welcome}</h1>

      </div>
    </>
  );
}
