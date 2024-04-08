import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { ExpertModule } from './expert/expert.module';
import { PriceModule } from './price/price.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/',
    }),
    AuthModule,
    UserModule,
    ServiceModule,
    ExpertModule,
    PriceModule,
    AppointmentModule,
  ],
})
export class AppModule {}
