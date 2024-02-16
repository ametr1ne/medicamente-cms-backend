import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { ExpertModule } from './expert/expert.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [ ConfigModule.forRoot(), AuthModule, UserModule, ServiceModule, ExpertModule, PriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
