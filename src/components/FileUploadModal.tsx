import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileUp } from 'lucide-react';
import Papa from 'papaparse';

interface FileUploadModalProps {
  onClose: () => void;
  onUpload: (data: any[]) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ onClose, onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        complete: (results) => {
          onUpload(results.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    });
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
    multiple: false,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Importer des données</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <input {...getInputProps()} />
          <FileUp className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          {isDragActive ? (
            <p className="text-blue-600">Déposez le fichier ici...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Glissez-déposez votre fichier ici, ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-500">
                Formats acceptés: .csv, .xls, .xlsx
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span>Sélectionner un fichier</span>
          </button>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};