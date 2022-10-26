import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class userEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    email: string
    @Column()
    password: string
    @CreateDateColumn()
    createdDt: Date
    @UpdateDateColumn()
    updatedDt: Date
}