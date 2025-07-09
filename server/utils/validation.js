const { z } = require("zod");

const vehicleZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  capacityKg: z.number({
    required_error: "Capacity is required",
    invalid_type_error: "Capacity must be a number",
  }),
  tyres: z
    .number({
      required_error: "Tyres count is required",
      invalid_type_error: "Tyres must be a number",
    })
    .min(2, { message: "Tyres must be more than 2" }),
});

const getAvailablevehicleZodSchema = z.object({
  capacityRequired: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
      message: "capacityRequired must be a positive number",
    }),

  fromPincode: z
    .string()
    .min(1, "fromPincode is required"),

  toPincode: z
    .string()
    .min(1, "toPincode is required"),

  startTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "startTime must be a valid ISO date string",
    }),
});

const bookingZodSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle ID is required"),
  fromPincode: z.string().optional(),
  toPincode: z.string().optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
  customerId: z.string().optional(),
});

module.exports = { vehicleZodSchema, bookingZodSchema,getAvailablevehicleZodSchema };
