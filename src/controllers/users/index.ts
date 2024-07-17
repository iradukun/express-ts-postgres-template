/* eslint-disable @typescript-eslint/ban-ts-comment --  */
import type { Response } from "express";

import createHttpError from "http-errors";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";
import { ZUserCreate, type TUserCreate } from "../../types/routes/users";

export const createUser = async (
  req: TypedRequestBody<TUserCreate>,
  res: Response,
) => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const payload = ZUserCreate.safeParse(req.body);
    if (payload.success) {
      const { username, email, password } = payload.data;

      const usernameExists = await userRepository.exist({
        where: { username },
      });
      if (usernameExists) {
        throw createHttpError(409, "Username already exists");
      }

      const emailExists = await userRepository.exist({
        where: { email },
      });
      if (emailExists) {
        throw createHttpError(409, "Email already exists");
      }

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.setPassword(password);
      await userRepository.save(newUser);

      return res.json({
        data: newUser,
        success: true,
        message: "success",
      });
    } else {
      return res.status(400).json({
        success: false,
        message:
          payload.error.errors[0].path + ": " + payload.error.errors[0].message,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      // @ts-expect-error
      code: err.code,
      // @ts-expect-error
      message: err.message,
    });
  }
};
