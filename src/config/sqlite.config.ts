import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

export const getSqliteConfig = async (configService: ConfigService):Promise<TypeOrmModuleOptions> =>
{
    return {
        type: 'sqlite',
        database: configService.get('DBNAME'),
        entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
        synchronize: true,
    }
}

       
