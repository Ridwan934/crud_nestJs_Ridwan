import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe,
    } from '@nestjs/common';
import { Render } from '@nestjs/common/decorators';
    import { CreateUserDto } from 'src/dto/user.dto';
    import { UsersService } from 'src/user/user.service';
    
    @Controller('users') 
    export class UsersController {
      constructor(private readonly userService: UsersService) {}
      @Render('index')
      @Get()
      root() {
        return{};
        // return this.userService.getUsers();
      }
      
      @Get('id/:id')
      findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUsersById(id);
      }
      
      @Post('create')
      @UsePipes(ValidationPipe)
      createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
      }
    }
    