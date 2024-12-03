import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './accounts/accounts.module';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
