import { User, UserFactory } from "@models/user.model";

export class UserService {

  public async create(user: User) {
    await UserFactory().create(user);
  }

  public async getAll() {
    return UserFactory().findAll();
  }

  public async getById(id: string) {
    return UserFactory().findByPk(id);
  }

  public async deleteUser(id: string) {
    return UserFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public async editUser(id: string, user: User) {
    const userFinded = await this.getById(id);
    Object.keys((userFinded as any).dataValues).forEach(key => {
      if (!user[key]) {
        user[key] = userFinded[key];
      }
    });
    delete user.id;
    await UserFactory().update(user, {
      where: {
        id: id
      }
    });
    return user;
  }
} 