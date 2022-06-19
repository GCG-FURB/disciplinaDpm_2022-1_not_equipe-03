// @ts-ignore: Unreachable code error
import AWS from 'aws-sdk';
// @ts-ignore: Unreachable code error
import moment from 'moment';

AWS.config.update({ region: 'us-east-1' });

const ID = 'AKIARGXHZ2B2MN5R6KRT';
const SECRET = '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';

const BUCKET_NAME = 'portaria-storage';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  signatureVersion: 'v4'
});

export class S3Service {

  public async uploadUrl(url: string) {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: url,
        Expires: 600
      };
      return s3.getSignedUrl(`putObject`, params);
    } catch (err) {

      return null;
    }
  }

  public async getUrl(url: string) {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: url,
        Expires: 600
      };
      return s3.getSignedUrl(`getObject`, params);
    } catch (err) {

      return null;
    }
  }

}