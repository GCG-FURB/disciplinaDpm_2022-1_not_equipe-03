import { BuildOptions, DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { Database } from '@libs/database';

interface LobbyAttributes {
  id?: string;
  name: string;
  activeLobby?: boolean;
  physicalLocation: string;
  createdAt?: Date;
  updatedAt?: string;
}

export interface LobbyModel extends Model<LobbyAttributes>, LobbyAttributes { }

export class Lobby extends Model<LobbyModel, LobbyAttributes> implements LobbyAttributes {
  id?: string;
  name: string;
  activeLobby?: boolean;
  physicalLocation: string;
  createdAt?: Date;
  updatedAt?: string;
}

export type LobbyStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): LobbyModel;
};

export function LobbyFactory(): LobbyStatic {
  return <LobbyStatic>Database.get().define('lobbies', {
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
    activeLobby: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    physicalLocation: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O local físico deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'Local físico não deve ser vazio'
        },
        notEmpty: {
          msg: 'Local físico não deve ser em branco'
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
