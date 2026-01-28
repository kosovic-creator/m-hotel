import { ucitajSobe } from '@/actions/soba';
import ObavještenjeUspjeha from '../components/ObavještenjeUspjeha';
import { getLocaleMessages } from '@/i18n/i18n';
import SobeTable from './components/SobeTable';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sobe'
};
export default async function SobeStrana({ searchParams }: { searchParams: Promise<{ lang?: string;[key: string]: string | undefined }> }) {
  const sobe = await ucitajSobe();
  const params = await searchParams;
  // DEBUG: Prikaz svih query parametara
  // eslint-disable-next-line no-console
  console.log('SOBE PAGE PARAMS:', params);
  const lang: "en" | "sr" = params?.lang === "sr" ? "sr" : "en";
  const t = getLocaleMessages(lang, 'sobe');
  const successParam = params.success;
  const errorParam = params.error;

  return (
    <>
      {successParam && (
        <ObavještenjeUspjeha message={successParam} type="success" />
      )}

      {
        errorParam && (
          <ObavještenjeUspjeha message={errorParam} type="error" />
        )
      }
      <div className="container mx-auto py-4 px-2 sm:px-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">{t.title}</h1>
        <div className="overflow-x-auto rounded-md shadow-sm bg-white p-2 sm:p-4">
          <SobeTable sobe={sobe || []} />
        </div>
      </div>
    </>

  );
}