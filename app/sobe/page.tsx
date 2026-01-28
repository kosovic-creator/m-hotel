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
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
        <SobeTable sobe={sobe || []} />
      </div>
    </>

  );
}