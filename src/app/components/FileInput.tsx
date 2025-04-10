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
                <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsPasteMode(true)}
                        className={`px-3 py-1 rounded-md text-sm ${isPasteMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Paste Text
                    </button>
                    <button
                        onClick={() => {
                            setIsPasteMode(false);
                            fileInputRef.current?.click();
                        }}
                        className={`px-3 py-1 rounded-md text-sm ${!isPasteMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
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
                    className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Paste your ${label.toLowerCase()} here...`}
                />
            ) : (
                <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".txt,.doc,.docx,.pdf"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Choose File
                    </button>
                </div>
            )}
        </div>
    );
} 