import { readRoom } from '@/actions/room';
import RoomTable from  './components/RoomTable'
// import RoomForm from '@/components/RoomForm';

export default async function RoomsPage() {
  const rooms = await readRoom();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      {/* <RoomForm /> */}
      <RoomTable rooms={rooms || []} />
    </div>
  );
}