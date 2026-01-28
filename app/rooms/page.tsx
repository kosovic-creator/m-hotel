import { readRoom } from '@/actions/room';
import RoomTable from './components/RoomTable'
import SuccessMessage from '../components/SuccessMessage';
import { getLocaleMessages } from '@/i18n/i18n';

export default async function RoomsPage({ searchParams }: { searchParams: Promise<{ lang?: string;[key: string]: string | undefined }> }) {
  const rooms = await readRoom();
  const params = await searchParams;
  const lang: "en" | "sr" = params?.lang === "sr" ? "sr" : "en";
  const t = getLocaleMessages(lang, 'rooms');
  const successParam = params.success;
  const errorParam = params.error;
  return (
    <>
      {successParam && (
        <SuccessMessage message={successParam} type="success" />
      )}

      {
        errorParam && (
          <SuccessMessage message={errorParam} type="error" />
        )
      }
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
        <RoomTable rooms={rooms || []} />
      </div>
    </>

  );
}