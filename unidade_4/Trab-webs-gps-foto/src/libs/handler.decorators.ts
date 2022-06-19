// @ts-ignore: Unreachable code error
import express from 'express';
import { Request, Response } from 'express';

import { Interceptor } from '@libs/interceptor';
import { ExpressInstance } from '@libs/express';
import { Database } from '@libs/database';
import { JWT } from '@libs/jwt';

import { ForbiddenException } from '@exceptions/forbidden.exception';

import { User } from '@models/user.model';

import { APIEnum } from '@enuns/api.enum';
import { Auth } from '@enuns/auth.enum';
import { Transactional } from '@enuns/transactional.enum';
import { FeaturesEnum } from '@enuns/features.enum';
import { PermissionEnum } from '@enuns/permission.enum';
// import { RolePermissionService } from '@services/role/role-permission.service';
import { UnauthorizedException } from '@exceptions/unauthorized.exception';
import { PermissionLevelEnum } from '@enuns/permission-level.enum';
import { CrudHandler } from './handler.crud';


export const API =
  // eslint-disable-next-line max-len
  (endpoint: string, type: APIEnum, transactional = Transactional.TRANSACTION, auth = Auth.REQUIRED,
    feature: FeaturesEnum = null, permission: PermissionEnum = null, permissionLevel = PermissionLevelEnum.CUSTUMER) =>
    (className: any, _2: string, propDesc: PropertyDescriptor) => {
      if (!ExpressInstance.EXPRESS) {
        ExpressInstance.EXPRESS = express();
      }
      switch (type) {
        case APIEnum.POST:
          ExpressInstance.get().post(endpoint, async (req: Request, res: Response) =>
            res.send(await processRequest(className, propDesc.value, req, res, transactional, auth, feature, permission, permissionLevel))
          );
          break;
        case APIEnum.PUT:
          ExpressInstance.get().put(endpoint, async (req: Request, res: Response) =>
            res.send(await processRequest(className, propDesc.value, req, res, transactional, auth, feature, permission, permissionLevel))
          );
          break;
        case APIEnum.DELETE:
          ExpressInstance.get().delete(endpoint, async (req: Request, res: Response) => {
            await processRequest(className, propDesc.value, req, res, transactional, auth, feature, permission, permissionLevel);
            res.send('');
          }
          );
          break;
        case APIEnum.GET:
        default:
          ExpressInstance.get().get(endpoint, async (req: Request, res: Response) =>
            res.send(await processRequest(className, propDesc.value, req, res, transactional, auth, feature, permission, permissionLevel))
          );
          break;
      }
    };

const processRequest =
  async (instance: CrudHandler, method: Function, req: Request, res: Response, transactional = Transactional.TRANSACTION, auth = Auth.REQUIRED,
    feature: FeaturesEnum, permission: PermissionEnum, permissionLevel = PermissionLevelEnum.CUSTUMER) => {
    if (req.body && req.body.toString()) {
      req.body = JSON.parse(req.body);
    }
    const payload = new Payload(req.params.id, req.body, req.query, req, res);
    try {
      if (auth === Auth.REQUIRED && !req.headers['x-api-key']) {
        throw new ForbiddenException('You are not authenticated!')
      }
      if (req.headers['x-api-key']) {
        payload.session = new JWT().decode<User>(req.headers['x-api-key'].toString());
        // if (feature && permission) {
        //   const role = await new RolePermissionService(payload).getByRole(feature, payload.session.roleId);
        //   if (role.dataValues[permission] === PermissionLevelEnum.NONE) {
        //     throw new UnauthorizedException('you cannot do this operation!');
        //   } else if (role.dataValues[permission] === PermissionLevelEnum.CUSTUMER) {
        //     if (permissionLevel === PermissionLevelEnum.ADMIN) {
        //       throw new UnauthorizedException('you cannot do this operation!');
        //     }
        //     await instance.validator(payload);
        //   }
        // }
      }
      if (transactional === Transactional.TRANSACTION) {
        payload.transaction = await Database.get().transaction();
      }
      const response = await method(payload);
      if (transactional === Transactional.TRANSACTION) {
        payload.transaction.commit();
      }
      return response;
    } catch (err) {
      if (transactional === Transactional.TRANSACTION && payload.transaction) {
        payload.transaction.rollback();
      }
      Interceptor.map(res, err);
    }
  };

export class Payload {
  constructor(
    public id: string,
    public body: any,
    public filter: any,
    public request: Request,
    public respose: Response,
    public session?: User,
    public transaction?: any
  ) { }

  public static instance() {
    return new Payload(null, null, null, null, null);
  }
}
