import { z } from "zod";

const CATEGORY_NAME_VALIDATOR = z
  .string()
  .min(1, "Category name is required!")
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "Category name can only contain letters, numbers or hypens."
  );

const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
  emoji: z.string().emoji("Invalid emoji").optional(),
});

const REQUEST_VALIDATOR = z
  .object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description: z.string().optional(),
  })
  .strict();

export { CATEGORY_NAME_VALIDATOR, EVENT_CATEGORY_VALIDATOR, REQUEST_VALIDATOR };
