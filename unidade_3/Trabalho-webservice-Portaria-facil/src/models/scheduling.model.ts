import { BuildOptions, DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { Database } from '@libs/database';

interface SchedulingAttributes {
  id?: string;
  visitReason: string;
  visitType: string;
  startDate: Date;
  endDate: Date;
  lobby: string;
  visited: string;
  visit: string;
  createdAt?: Date;
  updatedAt?: string;
}

export interface SchedulingModel extends Model<SchedulingAttributes>, SchedulingAttributes { }

export class Scheduling extends Model<SchedulingModel, SchedulingAttributes> implements SchedulingAttributes {
  id?: string;
  visitReason: string;
  visitType: string;
  startDate: Date;
  endDate: Date;
  lobby: string;
  visited: string;
  visit: string;
  createdAt?: Date;
  updatedAt?: string;
}

export type SchedulingStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): SchedulingModel;
};

export function SchedulingFactory(): SchedulingStatic {
  return <SchedulingStatic>Database.get().define('schedulings', {
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: v4()
    },
    visitReason: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O motivo da visita deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'O motivo da visita não deve ser vazio'
        },
        notEmpty: {
          msg: 'O motivo da visita não deve ser em branco'
        }
      }
    },
    visitType: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O tipo de visita deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'O tipo de visita não deve ser vazio'
        },
        notEmpty: {
          msg: 'O tipo de visita não deve ser em branco'
        }
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'A data ou hora deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'A data ou hora não deve ser vazio'
        },
        notEmpty: {
          msg: 'A data ou hora não deve ser em branco'
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: {
          args: [3, 12],
          msg: 'A data ou hora deve ter de 3 a 12 caracteres'
        },
        notNull: {
          msg: 'A data ou hora não deve ser vazio'
        },
        notEmpty: {
          msg: 'A data ou hora não deve ser em branco'
        }
      }
    },
    lobby: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 12],
          msg: 'A portaria deve ter de 3 a 12 caracteres'
        },
        notNull: {
          msg: 'A portaria não deve ser vazio'
        },
        notEmpty: {
          msg: 'A portaria não deve ser em branco'
        }
      }
    },
    visited: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 12],
          msg: 'O visitado deve ter de 3 a 12 caracteres'
        },
        notNull: {
          msg: 'O visitado não deve ser vazio'
        },
        notEmpty: {
          msg: 'O visitado não deve ser em branco'
        }
      }
    },
    visit: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 12],
          msg: 'O visitante deve ter de 3 a 12 caracteres'
        },
        notNull: {
          msg: 'O visitante não deve ser vazio'
        },
        notEmpty: {
          msg: 'O visitante não deve ser em branco'
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
