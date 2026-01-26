'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Room = {
  id: number;
  number: string;
  type: string;
  capacity: number;
  price: number;
};

export default function RoomTable({ rooms }: { rooms: Room[] }) {
  return (
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
              {/* Dodaj dugmad za edit i delete */}
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="destructive" size="sm" className="ml-2">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}