// @ts-ignore: Unreachable code error
import serverless from 'serverless-http';

import { ExpressInstance } from '@libs/express';
import { Handlers } from '@lambdas/portaria-facil/handlers';
import { Database } from '@libs/database';

Database.initialize();
Handlers.autoload();

const handler = serverless(ExpressInstance.get());
export const main = async (event, context) => {
  event.path = event.path.replace('/lobby-api', '');
  event.requestContext.path = event.requestContext.path.replace('/lobby-api', '');
  if (!event.path) {
    event.path = '/'
  }
  if (!event.requestContext.path) {
    event.requestContext.path = '/'
  }
  const result = await handler(event, context);

  return {
    statusCode: result.statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      'content-type': 'application/json; charset=utf-8; */*'
    },
    body: result.body
  };
};
