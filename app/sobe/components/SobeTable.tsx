'use client';

import { obrisiSobu } from "@/actions/soba";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type Soba = {
  id: number;
  broj: string;
  tip: string;
  kapacitet: number;
  cena: number;
};

export default function SobeTable({ sobe }: { sobe: Soba[] }) {
  const { i18n } = useTranslation();
  const { t } = useTranslation("sobe");
  return (
    <div>
      <div className="mb-4 ">
        <Link href="/sobe/dodaj" passHref>
          <Button asChild variant="default">
            <span>{t("add")}</span>
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("number")}</TableHead>
            <TableHead>{t("type")}</TableHead>
            <TableHead>{t("capacity")}</TableHead>
            <TableHead>{t("price")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sobe.map(soba => (
            <TableRow key={soba.id}>
              <TableCell>{soba.broj}</TableCell>
              <TableCell>{soba.tip}</TableCell>
              <TableCell>{soba.kapacitet}</TableCell>
              <TableCell>{soba.cena}</TableCell>
              <TableCell>
                <div className="flex space-x-2 flex-row justify-center">
                  <form action={obrisiSobu}>
                    <Input type="hidden" name="id" value={soba.id} />
                    <Button variant="destructive" size="sm" className="ml-2">{t("removeRoom")}</Button>
                  </form>
                  <Link href={`/sobe/izmeni?sobaId=${soba.id}&lang=${i18n.language}`}>
                    <Button variant="secondary" type="button">{t("editRoom")}</Button>
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