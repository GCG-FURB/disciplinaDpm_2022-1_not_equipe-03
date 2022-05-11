// @ts-ignore: Unreachable code error
import AWS from 'aws-sdk';
// @ts-ignore: Unreachable code error
import moment from 'moment';

import { S3CacheForgetFactory } from '@models/s3-cache.model';
import { Op } from 'sequelize';

AWS.config.update({ region: 'us-east-1' });

const ID = 'AKIAQG64LVSUGMNRF2G5';
const SECRET = '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';

const BUCKET_NAME = 'rede-social-bucket';

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

  public async getCache(url: string) {
    return (await S3CacheForgetFactory().findAll({
      where: {
        url: url
      }
    }))[0];
  }

  public async send(url: string, file: string) {
    const fileBuffered = Buffer.from(file.split(',')[1], 'base64');
    const params = {
      Bucket: BUCKET_NAME,
      Key: url,
      Body: fileBuffered,
    };
    return s3.upload(params, {}).promise();
  }

  public async deleteFile(url: string) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: url
    };
    await s3.deleteObject(params).promise();
    await this.deleteCache(url);
  }

  public async fileHasExists(url) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: url
    };
    await s3.headObject(params).promise();
    return true;
  }

  public async generateAllSignedUrl(urls: string[]) {
    if (!urls.length) {
      return [];
    }
    const urlsSigned = [];
    const cache = await S3CacheForgetFactory().findAll({
      where: {
        url: {
          [Op.in]: urls
        }
      }
    });
    
    for (let i = 0; i < urls.length; i++) {
      let url = cache.find(c => c.url === urls[i]);
      if (!url) {
        url = {
          signedUrl: await this.doGetSignedUrl(urls[i]) as string
        } as any;
      }
      if (moment(url.createdAt).isBefore(moment().subtract(1, 'day'))) {
        console.log('Removing image cache');
        await S3CacheForgetFactory().destroy({
          where: {
            id: url.id
          }
        });
        url = {
          signedUrl: await this.doGetSignedUrl(urls[i]) as string
        } as any;
      }
      
      urlsSigned.push({
        url: urls[i],
        signedUrl: url.signedUrl
      });
    }
    return urlsSigned;
  }

  public async generateSignedUrl(url: string) {
    const cache = await S3CacheForgetFactory().findOne({
      where: {
        url: url
      }
    });
    if (cache && moment(cache.updatedAt).isBefore(moment().add(1, 'day'))) {
      return cache.signedUrl;
    } else if (cache) {
      await S3CacheForgetFactory().destroy({
        where: {
          id: cache.id
        }
      });
    }
    return this.doGetSignedUrl(url);
  }

  private async doGetSignedUrl(url: string) {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: url
      } as any;
      await this.fileHasExists(url);
      params.Expires = 87000;
      return new Promise((resolve, reject) => {
        s3.getSignedUrl(`getObject`, params, async (err, signedUrl) => {
          if (err) {
            reject(err);
          } else {
            await S3CacheForgetFactory().create({
              url: url,
              signedUrl: signedUrl
            })
            resolve(signedUrl);
          }
        });
      });
    } catch (err) {

      return null;
    }
  }

  public async deleteCache(url: string) {
    await S3CacheForgetFactory().destroy({
      where: {
        url: url
      }
    });
  }
}