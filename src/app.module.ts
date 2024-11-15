import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',         
			database: 'C:\\Users\\v.belardo\\Desktop\\users.db',      
			entities: [User],          
			synchronize: true, 		   
			logging: true, 		          
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {} 
  