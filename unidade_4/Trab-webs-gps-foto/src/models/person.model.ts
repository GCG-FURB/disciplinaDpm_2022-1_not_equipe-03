import { BuildOptions, DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { Database } from '@libs/database';

interface PersonAttributes {
  id?: string;
  photo?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: string;
}

export interface PersonModel extends Model<PersonAttributes>, PersonAttributes { }

export class Person extends Model<PersonModel, PersonAttributes> implements PersonAttributes {
  id?: string;
  photo?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: string;
}

export type PersonStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): PersonModel;
};

export function PersonFactory(): PersonStatic {
  return <PersonStatic>Database.get().define('people', {
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: v4()
    },
    photo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    firstName: {
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
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O sobrenome deve ter de 3 a 150 caracteres'
        },
        notNull: {
          msg: 'Sobrenome não deve ser vazio'
        },
        notEmpty: {
          msg: 'Sobrenome não deve ser em branco'
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
    phone: {
      type: DataTypes.STRING(12),
      allowNull: false,
      validate: {
        len: {
          args: [3, 12],
          msg: 'O número deve ter de 3 a 12 caracteres'
        },
        notNull: {
          msg: 'O número não deve ser vazio'
        },
        notEmpty: {
          msg: 'O número não deve ser em branco'
        }
      }
    },
    street: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O endereço deve ter de 3 a 150 caracteres'
        }
      }
    },
    number: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        len: {
          args: [0, 15],
          msg: 'O número deve ter de 0 a 15 caracteres'
        }
      }
    },
    district: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O bairro deve ter de 3 a 150 caracteres'
        }
      }
    },
    city: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        len: {
          args: [3, 150],
          msg: 'A cidade deve ter de 3 a 150 caracteres'
        }
      }
    },
    province: {
      type: DataTypes.STRING(3),
      allowNull: true,
      validate: {
        len: {
          args: [0, 3],
          msg: 'O estado deve ter de 0 a 3 caracteres'
        }
      }
    },
    country: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        len: {
          args: [3, 150],
          msg: 'O País deve ter de 3 a 150 caracteres'
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
