import { Module } from '@nestjs/common';
import { AbilityModule } from '../ability/ability.module';
import { UserController } from "./users.controller";
import { UserService } from './users.service';

@Module({
  imports: [AbilityModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}