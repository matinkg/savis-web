interface uploaderProps {
  url: string;
  setValue: (key: string, value: any) => void;
  keyName: string;
}

interface uploaderReturn {
  handleUpload: (acceptedFiles: File[], onChange: (file: any) => void) => void;
  loading: boolean;
}

export type { uploaderProps, uploaderReturn };
