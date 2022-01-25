import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { IUserService } from "src/user/interfaces/user";
import { SERVICES } from "src/utils/constants";
import { User } from "src/utils/typeorm/entities/User";
import { Done } from "src/utils/types";

export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(SERVICES.USER) private readonly userService:
    IUserService) {
    super();
  }
  serializeUser(user: User, done: Done) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    try {
      const userDB = await this.userService.findUser(user.discordId);
      return userDB ? done(null, userDB) : done(null, null);
    } catch (error) {
      done(error, null);
    }
  }

}