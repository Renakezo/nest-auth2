import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { userDto } from 'src/user/dto/user.dto';
import { userEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>, private readonly jwtService: JwtService) {}

    async login(dto: userDto){
        const user = await this.validateUser(dto)

        const tokens = await this.issueTokenPair(String(user.id))

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async register(dto: userDto){
        const oldUser = await this.userRepository.findOne({where: {email: dto.email}})
        if(!oldUser) throw new BadRequestException('User with this email is already in the system')

        const salt = await genSalt(10)

        const newUser = this.userRepository.create({email: dto.email, password: await hash(dto.password, salt)})

        const user = await this.userRepository.save(newUser)

        const tokens = await this.issueTokenPair(String(user.id))

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async validateUser(dto: userDto) {
        const user = await this.userRepository.findOne({where: {email: dto.email}})
        if(!user) throw new UnauthorizedException('User not found')  

        const isValidPassword = await compare(dto.password, user.password)
        if(!isValidPassword) throw new UnauthorizedException('Invalid password')

        return user
    }

    async issueTokenPair(id: string) {
        const data = {id}

        const accesToken = await this.jwtService.signAsync(data, {
            expiresIn: '10d'
        })

        return { accesToken }
    }

    returnUserFields(user: userEntity) {
        return {
            id: user.id,
            email: user.email
        }
    }
}
