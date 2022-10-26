import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { join } from 'path'

export const getJwtConfig = async (configService: ConfigService):Promise<JwtModuleOptions> =>
{
    return {
        secret: configService.get('JWT_SECRET'),
    }
}