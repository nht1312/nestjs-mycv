import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    //Create a new user
    create(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user)
    }
    // Find a user by id
    findOne(id: number){
        return this.repo.findOneBy({id})
    }
    // Find all user
    find(email: string){
        return this.repo.find({where: {email}})
    }
    // Update a user
    async update(id: number, attrs: Partial<User>){
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('user not found')
        }
        Object.assign(user, attrs)
        return this.repo.save(user)
    }
    // Remove a user
    async remove(id: number){
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return this.repo.remove(user)
    }
}
