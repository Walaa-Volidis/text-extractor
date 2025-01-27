import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { uploadToS3 } from '../../../lib/uploadToS3';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageUrl = await uploadToS3(buffer);
    console.log('Image URL:', imageUrl);
    const output = await replicate.run(
      'abiruyt/text-extract-ocr:a524caeaa23495bc9edc805ab08ab5fe943afd3febed884a4f3747aa32e9cd61',
      {
        input: {
          image: imageUrl,
        },
      }
    );
    console.log('output:', output);
    return NextResponse.json({
      message: 'Images generated and saved successfully',
      text: output,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate image' });
  }
}
