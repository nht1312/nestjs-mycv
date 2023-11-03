import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) {}
    // Signup
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
    }
    // Find user by id
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }
    // Find All user
    @Get()
    async findAllUsers(@Query('email') email: string) {
        return await this.usersService.find(email)
    }
    // Remove a user
    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const user = await this.usersService.remove(parseInt(id))
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }
    // Update a user
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const user = await this.usersService.update(parseInt(id), body)
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }
}
