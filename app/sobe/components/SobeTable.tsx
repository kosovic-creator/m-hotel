'use client';

import { obrisiSobu } from "@/actions/soba";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PotvrdaBrisanjaModal from "./PorvrdaBrisanjaModal";

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
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
    setSelectedId(null);
  };
  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div>
      <div className="mb-4">
        <Link href="/sobe/dodaj" passHref>
          <Button asChild variant="default" className="w-full sm:w-auto">
            <span>{t("add")}</span>
          </Button>
        </Link>
      </div>
      {/* Desktop table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("number")}</TableHead>
              <TableHead>{t("type")}</TableHead>
              <TableHead>{t("capacity")}</TableHead>
              <TableHead>{t("price")}</TableHead>
              <TableHead></TableHead>
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
                    <form
                      action={obrisiSobu}
                      ref={selectedId === soba.id ? formRef : undefined}
                    >
                      <Input type="hidden" name="id" value={soba.id} />
                      <Input type="hidden" name="lang" value={i18n.language} />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="ml-2"
                        type="button"
                        onClick={() => handleDeleteClick(soba.id)}
                      >
                        {t("removeRoom")}
                      </Button>
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
      {/* Mobile cards */}
      <div className="flex flex-col gap-4 sm:hidden">
        {sobe.map(soba => (
          <div key={soba.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">{t("number")}:</span>
              <span>{soba.broj}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{t("type")}:</span>
              <span>{soba.tip}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{t("capacity")}:</span>
              <span>{soba.kapacitet}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">{t("price")}:</span>
              <span>{soba.cena}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <form action={obrisiSobu} className="flex-1">
                <Input type="hidden" name="id" value={soba.id} />
                <Button variant="destructive" size="sm" className="w-full">{t("removeRoom")}</Button>
              </form>
              <Link href={`/sobe/izmeni?sobaId=${soba.id}&lang=${i18n.language}`} className="flex-1">
                <Button variant="secondary" type="button" className="w-full">{t("editRoom")}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <PotvrdaBrisanjaModal
        open={modalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}