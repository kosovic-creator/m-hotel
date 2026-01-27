import Link from 'next/link'
import RoomForm from '../components/RoomForm';
import { readRoomId, updateRoom } from '@/actions/room';

type SearchParams = {
    roomId?: string;
};

export default async function IdPage({ searchParams }: { searchParams: Promise<SearchParams> | SearchParams }) {
    const params = typeof searchParams === 'object' && 'then' in searchParams
        ? await searchParams
        : searchParams;

    const id = Number(params.roomId);

    if (!params.roomId || isNaN(id)) {
        return <div>Neispravan ID parametar.</div>;
    }

    const room = await readRoomId({ roomId: id });

    if (!room) {
        return <div>Podatak nije pronađen.</div>;
    }

    return (
        <>
            <Link className='text-grey-600 hover:text-blue-900' href="/">Nazad na sobe</Link>
            <RoomForm
                action={updateRoom}
                initialData={{ ...room, id: String(room.id) }}
                mode="edit"
            />
        </>
    );
}