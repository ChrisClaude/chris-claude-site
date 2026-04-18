import { AuthGuard } from '@/_components/auth/AuthGuard';
import CreatePostForm from './CreatePostForm';

const CreatePostPage = () => {
  return (
    <AuthGuard userType={['Admin', 'Publisher']}>
      <CreatePostForm />
    </AuthGuard>
  );
};

export default CreatePostPage;
