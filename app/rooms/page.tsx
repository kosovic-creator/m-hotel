import { readRoom } from '@/actions/room';
import RoomTable from './components/RoomTable'
import SuccessMessage from '../components/SuccessMessage';
// import RoomForm from '@/components/RoomForm';

export default async function RoomsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const rooms = await readRoom();
  const params = await searchParams;
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
        <h1 className="text-2xl font-bold mb-4">Rooms</h1>
        {/* <RoomForm /> */}
        <RoomTable rooms={rooms || []} />
      </div>
    </>

  );
}