import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/portaria-facil.main`,
  events: [
    {
      http: {
        method: 'any',
        path: '/lobby-api/{proxy+}',
        cors: {
          origin: '*',
          headers: [
            '*'
          ]
        }
      }
    },
    {
      http: {
        method: 'any',
        path: '/lobby-api/',
        cors: {
          origin: '*',
          headers: [
            '*'
          ]
        }
      }
    }
  ]
}
