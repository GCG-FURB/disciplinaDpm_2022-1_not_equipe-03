// @ts-ignore: Unreachable code error
import * as AWS from 'aws-sdk';
// @ts-ignore: Unreachable code error
import moment from 'moment';

const ID = 'AKIAQG64LVSUGMNRF2G5';
const SECRET = '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';

AWS.config.update({ region: 'us-east-1' });

const BUCKET_NAME = 'rede-social-bucket-temp';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  signatureVersion: 'v4'
});

export class S3TempService {

  public async uploadUrl(url: string) {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: url,
        Expires: 600,
        ContentType: 'image/jpg'
      };
      return s3.getSignedUrl(`putObject`, params);
    } catch (err) {

      return null;
    }
  }

}