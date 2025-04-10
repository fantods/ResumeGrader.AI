'use client';

import { useState, useRef } from 'react';

interface FileInputProps {
  label: string;
  onContentChange: (content: string) => void;
}

export default function FileInput({ label, onContentChange }: FileInputProps) {
  const [isPasteMode, setIsPasteMode] = useState(true);
  const [textContent, setTextContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      setTextContent(text);
      onContentChange(text);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTextContent(text);
    onContentChange(text);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-lg font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPasteMode(true)}
            className={`rounded-md px-3 py-1 text-sm ${
              isPasteMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Paste Text
          </button>
          <button
            onClick={() => {
              setIsPasteMode(false);
              fileInputRef.current?.click();
            }}
            className={`rounded-md px-3 py-1 text-sm ${
              !isPasteMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Upload File
          </button>
        </div>
      </div>

      {isPasteMode ? (
        <textarea
          value={textContent}
          onChange={handleTextChange}
          className="h-48 w-full resize-none rounded-lg border border-gray-300 bg-white p-4 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          placeholder={`Paste your ${label.toLowerCase()} here...`}
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.doc,.docx,.pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Choose File
          </button>
        </div>
      )}
    </div>
  );
}
