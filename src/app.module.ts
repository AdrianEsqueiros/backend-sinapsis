import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),        

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.MYSQL_DB,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      // ssl: process.env.STAGE === 'prod',
      // extra: {
      //   ssl: process.env.STAGE === 'prod'
      //         ? { rejectUnauthorized: false }
      //         : null,
      // },
      // type: 'postgres',
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // database: process.env.POSTGRES_DB,
      // username: process.env.POSTGRES_USER,
      // password: process.env.POSTGRES_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule, UsersModule, CampaignsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
