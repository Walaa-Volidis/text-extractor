import { describe, it, expect, vi } from 'vitest';
import { uploadToS3 } from '../lib/uploadToS3';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

vi.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: vi.fn().mockImplementation(() => {
      return {
        send: vi.fn().mockResolvedValue({}),
      };
    }),
    PutObjectCommand: vi.fn(),
  };
});

describe('uploadToS3', () => {
  it('should upload an image to S3 and return the URL', async () => {
    const buffer = Buffer.from('test image data');
    const result = await uploadToS3(buffer);

    expect(result).toMatch(/^https:\/\/.+\.s3\..+\.amazonaws\.com\/.+\.png$/);
    expect(S3Client).toHaveBeenCalled();
    expect(PutObjectCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        Bucket: expect.any(String),
        Key: expect.any(String),
        Body: buffer,
        ACL: 'public-read',
        ContentType: 'image/png',
      })
    );
  });
});