import { BuildOptions, DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { Database } from '@libs/database';

interface VisitTypeAttributes {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: string;
}

export interface VisitTypeModel extends Model<VisitTypeAttributes>, VisitTypeAttributes { }

export class VisitType extends Model<VisitTypeModel, VisitTypeAttributes> implements VisitTypeAttributes {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: string;
}

export type VisitTypeStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): VisitTypeModel;
};

export function VisitTypeFactory(): VisitTypeStatic {
  return <VisitTypeStatic>Database.get().define('visit_types', {
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
    description: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'A descrição deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'Descrição não deve ser vazio'
        },
        notEmpty: {
          msg: 'Descrição não deve ser em branco'
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
