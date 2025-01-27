import { useState } from 'react';

export function useImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const selectedFile = e.target.files?.[0];
     if (selectedFile) {
       setFile(selectedFile);
       setImagePreview(URL.createObjectURL(selectedFile));
     }
   };

   const handleUpload = async () => {
     if (!file) return;

     setIsLoading(true);
     const formData = new FormData();
     formData.append('file', file);

     try {
       const response = await fetch('/api/extract', {
         method: 'POST',
         body: formData,
       });

       const result = await response.json();
       setExtractedText(result.text);
     } catch (error) {
       console.error('Upload error:', error);
     } finally {
       setIsLoading(false);
     }
   };
  return {
    file,
    imagePreview,
    extractedText,
    isLoading,
    handleFileChange,
    handleUpload,
  };
}
