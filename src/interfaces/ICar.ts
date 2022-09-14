import { z } from 'zod';
import { zVehicleSchema } from './IVehicle';

export const zCarSchema = zVehicleSchema.merge(z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
}));

export type ICar = z.infer<typeof zCarSchema>;
