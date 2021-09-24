import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', process.env.NODE_ENV].filter(Boolean).join('.') }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
