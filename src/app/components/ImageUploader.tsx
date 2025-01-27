'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useImage } from '../hooks/use-image';
export function ImageUploader() {
  const {
    file,
    imagePreview,
    extractedText,
    isLoading,
    handleFileChange,
    handleUpload,
  } = useImage();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Image Text Extractor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={400}
              height={300}
              className="object-contain"
            />
          )}
          <Button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Extract Text
              </>
            )}
          </Button>
          {extractedText && (
            <div className="mt-4 p-3 border rounded">
              <h3 className="font-semibold mb-2">Extracted Text:</h3>
              <p>{extractedText}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
