import { IsEmail, Length } from "class-validator";
import { Entity, Column, OneToMany, Index, BeforeInsert } from "typeorm"
import bcrypt from 'bcryptjs'
import Post from "./Post";
import Vote from "./Vote";
import BaseEntity from './Entity';

@Entity("users")
export class User extends BaseEntity {

    @Index()
    @IsEmail(undefined, {message: "The email address is wrong."})
    @Length(1, 255, {message: "Email address cannot be empty."})
    @Column({ unique: true })
    email: string;

    @Index()
    @Length(3, 32, {message: "You should write more than 3 letters."})
    @Column({ unique: true })
    username: string;

    @Index()
    @Length(6, 255, {message: "The password should be over 6 letters."})
    @Column()
    password: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
