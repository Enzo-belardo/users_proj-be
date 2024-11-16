import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/userDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    // private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async getAllUser(): Promise<UserDto[]> {
        const findAllUser = this.userRepository.find()
        
        return findAllUser;
    }
    
    async createUser(user: UserDto): Promise<UserDto | any> {
       
        const newUser = this.userRepository.create(user); 
        
        const savedUser = await this.userRepository.save(newUser);  
    
        return savedUser; 
    }
    
    async updateUser(id: number,  user: UserDto): Promise<UserDto | any> {
        const existingUser = await this.userRepository.findOne({ where: { id: id } });
        
        if(existingUser){
            existingUser.name = user.name; 
            existingUser.surname = user.surname; 
            existingUser.email = user.email; 
            existingUser.date_birthday = user.date_birthday;
        }

        const updatedUser = await this.userRepository.save(existingUser);
    
        return updatedUser;
    }
    

    async deleteUser(id: number): Promise<any> {
        const findIdUser = await this.userRepository.findOne({ where: { id: id } });

        if (findIdUser) {
          return  this.userRepository.remove(findIdUser);
        } 
    }
      
}
