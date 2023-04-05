import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModule } from './gateways/gateways.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    GatewaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
