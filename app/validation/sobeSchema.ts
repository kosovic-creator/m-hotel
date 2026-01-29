import { z } from "zod";
export type TranslateFn = (key: string) => string;

export const sobaSchema = (t: TranslateFn) => z.object({
  broj: z.string().min(1, { message: t("broj_error") }),
  tip: z.string().min(1, { message: t("tip_error") }),
  kapacitet: z.coerce.number().int().min(1, { message: t("kapacitet_error") }),
  cena: z.coerce.number().min(0, { message: t("cena_error") }),
});