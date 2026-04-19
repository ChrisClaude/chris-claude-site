'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MetadataStep from '@/_components/PostEditor/MetadataStep';
import DocumentEditor from '@/_components/PostEditor/DocumentEditor';

const CreatePostForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<'metadata' | 'editor'>('metadata');
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  if (step === 'metadata') {
    return (
      <MetadataStep
        onStart={data => {
          setMetadata(data);
          setStep('editor');
        }}
      />
    );
  }

  return (
    <DocumentEditor
      initialMetadata={metadata!}
      onBack={() => router.push('/posts')}
    />
  );
};

export default CreatePostForm;
