import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Neispravan email" }),
  lozinka: z.string().min(6, { message: "Lozinka mora imati bar 6 karaktera" }),
});

export const registerSchema = z.object({
  ime: z.string().min(2, { message: "Ime mora imati bar 2 karaktera" }),
  email: z.string().email({ message: "Neispravan email" }),
  lozinka: z.string().min(6, { message: "Lozinka mora imati bar 6 karaktera" }),
});

// Dodaj i druge auth šeme po potrebi