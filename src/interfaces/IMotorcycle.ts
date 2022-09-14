import { z } from 'zod';
import { zVehicleSchema } from './IVehicle';

export const zMotorcycleSchema = zVehicleSchema.merge(z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().gte(2500),
}));

export type IMotorcycle = z.infer<typeof zMotorcycleSchema>;
