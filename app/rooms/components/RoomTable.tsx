'use client';

import { deleteRoom } from "@/actions/room";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

type Room = {
  id: number;
  number: string;
  type: string;
  capacity: number;
  price: number;
};

export default function RoomTable({ rooms }: { rooms: Room[] }) {
  return (
    <div>
      <div className="mb-4 ">
        <Link href="/rooms/add" passHref>
          <Button asChild variant="default">
            <span>Add</span>
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map(room => (
            <TableRow key={room.id}>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.price}</TableCell>
              <TableCell>
                <div className="flex space-x-2 flex-row justify-center">
                  <form action={deleteRoom}>
                    <Input type="hidden" name="id" value={room.id} />
                    <Button variant="destructive" size="sm" className="ml-2">Ukloni Sobu</Button>
                  </form>
                  <Link href={`/rooms/edit?roomId=${room.id}`}>
                    <Button variant="secondary" type="button" >Izmjeni Sobu</Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}