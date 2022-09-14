import { z } from 'zod';
import { zVehicleSchema } from './IVehicle';

export const zMotorcycleSchema = zVehicleSchema.merge(z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().lte(2500).positive(),
}));

export type IMotorcycle = z.infer<typeof zMotorcycleSchema>;
