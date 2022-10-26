import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/create')
    create(@Body() UserDto: userDto) {
        return this.userService.create(UserDto)
    }

    @Get('/get')
    getAll() {
        return this.userService.getAll()
    }

    @Get('/get/:id')
    getOne(@Param('id') id: string) {
        return this.userService.findOne(+id)
    }

    @Delete('/del/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id)
    }
}
