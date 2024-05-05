import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EntityNotFoundException } from 'src/exceptions/entity-not-found.exception';
import { UserBadge } from './entities/user-badge.entity';
import { Report } from 'src/report/report.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(UserBadge)
    private userBadgeRepository: Repository<UserBadge>,
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  // Notice: Password must be hashed. This is just temp.
  create(username: string, email: string, password: string) {
    const user: User = this.userRepository.create({
      username,
      password,
      email,
    }); // using create then save will let u do soem other stuff(like data validation) before saving.
    // But if its not needed directly using save is sufficient.
    return this.userRepository.save(user);
  }

  addBadge(userId: number, name: string) {
    const userBadge: UserBadge = this.userBadgeRepository.create({
      userId,
      name,
    });
    return this.userBadgeRepository.save(userBadge);
  }

  findBadges() {
    return this.userBadgeRepository.find();
  }
  createDirectly(username: string, email: string, password: string) {
    return this.userRepository.save({ username, password, email }); // This works too
  }

  findOne(id: number) {
    if (!id) return null;
    return this.userRepository.findOneBy({ id });
  }

  find(searchParam: Partial<User>): Promise<User[]> {
    const { username, email } = searchParam;
    // Notice: Actually, this search must be returned as One, but as Uniqueness of email/username has not been implemented,
    // for now its implemented this way ...
    if (username) return this.userRepository.findBy({ username });
    if (email) return this.userRepository.findBy({ email });

    return Promise.resolve([]);
  }

  async updateById(id: number, fields: Partial<User>) {
    // Notice: Reason for not using repo.update directly, is that that way Hooks dont execute. And there may other works that should be done in between.
    const user = await this.findOne(id);
    if (!user) {
      throw new EntityNotFoundException('User');
    }
    return this.update(user, fields);
  }

  update(user: User, fields: Partial<User>) {
    Object.assign(user, fields);
    return this.userRepository.save(user);
  }

  async removeById(id: number) {
    // Other approach is using delete. That does the job directly but as mentioned in update section about .update,
    // this delete method doesnt run Hooks too.
    const user = await this.findOne(id);
    if (!user) {
      throw new EntityNotFoundException('User');
    }

    return this.userRepository.remove(user); // remove & save and maybe run some hooks
  }

  async remove(user: User) {
    console.log("SOFT REMOVE");
    return this.userRepository.softRemove(user);
  }

  async hardRemove(user: User) {
    // make a list of all repos that have userId column
    const deleteAll = async (
      repos: Repository<any>[],
      linkColumnName: string,
    ) => {
      for (const repo of repos) {
        const items = await repo.findBy({ [linkColumnName]: user.id });
        // now remove every related row to the user from the repo

        for (const item of items) {
          await repo.softRemove(item);
        }
      }
    };

    await deleteAll(
      [this.userBadgeRepository, this.reportRepository],
      'userId',
    );

    // await deleteAll([this.nftRepository], 'ownerId'); // Nft Entity connects to User Entity by ownerId column, not userId
    // TODO: check out how & where user-uploaded avatars are saved

    // TOASK: What about Leagues that their starter is this user? remove the whole league!?

    // finally remove the user itself
    return this.userRepository.softRemove(user);
  }
}
