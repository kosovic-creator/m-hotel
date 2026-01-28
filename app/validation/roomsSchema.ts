import { z } from "zod";

export const roomSchema = z.object({
  number: z.string().min(1, { message: "Broj sobe je obavezan" }),
  type: z.string().min(1, { message: "Tip sobe je obavezan" }),
  capacity: z.coerce.number().int().min(1, { message: "Kapacitet mora biti veći od 0" }),
  price: z.coerce.number().min(0, { message: "Cena mora biti veća ili jednaka 0" }),
});