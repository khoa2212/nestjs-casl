import { Module } from '@nestjs/common';
import { AbilityModule } from './ability/ability.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilityGuard } from './ability/ability.guard';

@Module({
  imports: [UserModule, AbilityModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AbilityGuard
    }
  ],
})
export class AppModule {}
