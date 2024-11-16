import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { Response } from 'express';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  	@Get('users')
		async findAll(@Res() response: Response): Promise<UserDto[] | any> {
		try {
			const users = await this.usersService.getAllUser();

			if(users){
				response.status(HttpStatus.OK).json(users);
				return users
			}
			

		} catch (error) {

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({

				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Errore durante il recupero degli utenti.',
				error: 'Internal Server Error',
			});
		}
	}

  	@Post('create')
	async create(@Body() user: UserDto,  @Res() response: Response): Promise<UserDto | any> {
		try { 
			if (user) {
				const createdUser = await this.usersService.createUser(user);

				response.status(HttpStatus.CREATED).json(user)

				return createdUser;  
			} else {

				response.status(HttpStatus.BAD_REQUEST).json({

					statusCode: HttpStatus.BAD_REQUEST,
					message: 'La richiesta non è valida.',
					error: 'Bad Request',
				})
			}
		} catch (error) { 
		
			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({

				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Errore durante la creazione di un nuovo utente',
				error: 'Internal Server Error',
			});
		}  
	}

  	@Put('update/:id')
  	async updateUser(@Param('id') id: number, @Body() user: UserDto,  @Res() response: Response): Promise<UserDto | any> {
		try {
			if(user){
				const updateUser = await this.usersService.updateUser(id, user); 
				if(updateUser){
					response.status(HttpStatus.CREATED).json(updateUser)
					return updateUser; 
				}

			}else{
				response.status(HttpStatus.BAD_REQUEST).json({

					statusCode: HttpStatus.BAD_REQUEST,
					message: 'La richiesta non è valida.',
					error: 'Bad Request',
				})
			} 

		} catch (error) {  
			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({

				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Errore durante l\'aggiornamento dell\'utente',
				error: 'Internal Server Error',
			});
		}
  	}



  	@Delete('delete/:id')
  	async deleteUser(@Param('id') id: number, @Res() response: Response): Promise<UserDto | any> {
		try {
			if(id){
				response.status(HttpStatus.CREATED).json()
				return this.usersService.deleteUser(id);
				
			}else{
				return  response.status(HttpStatus.FOUND).json
			}
			
		} catch (error) {

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Errore durante la cancellazione dell\'utente',
				error: 'Internal Server Error',
			});        
		}
  	}
}
