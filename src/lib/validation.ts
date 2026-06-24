import { z } from "zod";

// סכמת ולידציה לטופס יצירת קשר (משותף ללקוח ולשרת)
export const contactSchema = z.object({
  owner_name: z.string().min(2, "נא להזין שם"),
  phone: z
    .string()
    .min(9, "נא להזין מספר טלפון תקין")
    .regex(/^[0-9+\-\s()]+$/, "מספר טלפון לא תקין"),
  city: z.string().optional(),
  dog_breed: z.string().optional(),
  dog_age: z.string().optional(),
  neutered: z.boolean().optional(),
  friendly: z.boolean().optional(),
  service_slug: z.string().optional(),
  message: z.string().optional(),
  privacy: z.literal(true, { message: "יש לאשר את מדיניות הפרטיות" }),
  // honeypot — חייב להישאר ריק. בוטים נוטים למלא אותו.
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.input<typeof contactSchema>;
