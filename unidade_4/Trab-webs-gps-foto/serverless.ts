import type { AWS } from '@serverless/typescript';

import portariaFacil from '@lambdas/portaria-facil';

const serverlessConfiguration: AWS = {
  service: 'portaria-facil',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  package: {
    individually: true
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    memorySize: 450,
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      // PRODUCTION: 'prod',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { portariaFacil }
};

module.exports = serverlessConfiguration;
