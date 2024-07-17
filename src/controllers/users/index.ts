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
  // Create a query runner to control the transactions, it allows to cancel the transaction if we need to
  const queryRunner = AppDataSource.createQueryRunner();

  // Connect the query runner to the database and start the transaction
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const payload = ZUserCreate.safeParse(req.body);
    if (payload.success) {
      const { username, email, password } = payload.data;

      const userRepo = queryRunner.manager.getRepository(User);
      const usernameExists = await userRepo.exist({
        where: { username },
      });
      if (usernameExists) {
        throw createHttpError(409, "Username already exists");
      }

      const emailExists = await userRepo.exist({
        where: { email },
      });
      if (emailExists) {
        throw createHttpError(409, "Email already exists");
      }

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.setPassword(password);
      await queryRunner.manager.save(newUser);

      // No exceptions occured, so we commit the transaction
      await queryRunner.commitTransaction();
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
    await queryRunner.rollbackTransaction();
    return res.status(500).json({
      success: false,
      // @ts-expect-error
      code: err.code,
      // @ts-expect-error
      message: err.message,
    });
  } finally {
    // We need to release the query runner to not keep a useless connection to the database
    await queryRunner.release();
  }
};
