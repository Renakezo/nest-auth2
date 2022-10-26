import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDto } from './dto/user.dto';
import { userEntity } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) {}

    async create(userDto: userDto) {
        const newUser: userEntity = {
            id: Date.now(),
            ...userDto,
            createdDt: new Date(),
            updatedDt: new Date()
        }
        return await this.userRepository.save(newUser)
    } 

    async getAll(){
       return await this.userRepository.find()
    }

    async findOne(id: number) {
       return await this.userRepository.findOne({
        where: {id: Number(id)}
       })
    }

    async delete(id: number) {
        this.userRepository.delete(id)
    }
}
