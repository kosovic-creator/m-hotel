import Link from 'next/link'
import RoomForm from '../components/RoomForm';
import { readRoomId, updateRoom } from '@/actions/room';

type SearchParams = {
    roomId?: string;
    locale?: string;
};

const translations = {
    en: {
        back: "Back to rooms",
        invalid: "Invalid ID parameter.",
        notfound: "Room not found."
    },
    sr: {
        back: "Nazad na sobe",
        invalid: "Neispravan ID parametar.",
        notfound: "Podatak nije pronađen."
    }
};

export default async function IdPage({ searchParams }: { searchParams: Promise<SearchParams> | SearchParams }) {
    const params = typeof searchParams === 'object' && 'then' in searchParams
        ? await searchParams
        : searchParams;

    const locale: "en" | "sr" = params.locale === "sr" ? "sr" : "en";
    const id = Number(params.roomId);

    if (!params.roomId || isNaN(id)) {
        return <div>{translations[locale].invalid}</div>;
    }

    const room = await readRoomId({ roomId: id });

    if (!room) {
        return <div>{translations[locale].notfound}</div>;
    }

    return (
        <>
            <Link className='text-grey-600 hover:text-blue-900' href={`/?locale=${locale}`}>
                {translations[locale].back}
            </Link>
            <RoomForm
                action={updateRoom}
                initialData={{ ...room, id: String(room.id) }}
                mode="edit"
            />
        </>
    );
}