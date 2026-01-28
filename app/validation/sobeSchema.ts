import { z } from "zod";

export const sobaSchema = z.object({
  broj: z.string().min(1, { message: "Broj sobe je obavezan" }),
  tip: z.string().min(1, { message: "Tip sobe je obavezan" }),
  kapacitet: z.coerce.number().int().min(1, { message: "Kapacitet mora biti veći od 0" }),
  cena: z.coerce.number().min(0, { message: "Cena mora biti veća ili jednaka 0" }),
});