import { BuildOptions, DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { Database } from '@libs/database';

interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }

export class User extends Model<UserModel, UserAttributes> implements UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: string;
}

export type UserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(): UserStatic {
  return <UserStatic>Database.get().define('users', {
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: v4()
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O nome deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'Nome não deve ser vazio'
        },
        notEmpty: {
          msg: 'Nome não deve ser em branco'
        }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O e-mail deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'E-mail não deve ser vazio'
        },
        notEmpty: {
          msg: 'E-mail não deve ser em branco'
        }
      }
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'A senha deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'Senha não deve ser vazia'
        },
        notEmpty: {
          msg: 'Senha não deve ser em branco'
        }
      }
    },    
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
}
