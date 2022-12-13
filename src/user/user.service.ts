import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  getUsers() {
    throw new Error('Method not implemented.');
  }
  findUsersById(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
      
  async createUser(request: CreateUserDto) {
    const newUser = this.userRepository.create(request);
    return this.userRepository.save(newUser);
  }
  async deleteUser(id:number){
    let user = await this.userRepository.findOne({
      where: {
        user_id: id
      }
    });
    // if (!user) {

    // }
  }    
 async updateuser(id: number, request:CreateUserDto) {
    let userExist= await this.userRepository.findOne({
        where: {
            user_id: id},
    });
    if (!userExist){
        throw new BadRequestException("data user not found");

    }

    //logic update 
    userExist.email_address = request.email_address;
    userExist.password = request.password;
    userExist.username = request.username;
    return this.userRepository.save(userExist);
    // return this.userRepository
    // .createQueryBuilder()
    // .update(userExist)
    // .where(id)
  }
}