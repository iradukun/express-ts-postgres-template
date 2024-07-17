import z from "zod";

export const ZUserCreate = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type TUserCreate = z.infer<typeof ZUserCreate>;
