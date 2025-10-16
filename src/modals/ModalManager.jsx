import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import { OwnerSignUp } from './OwnerSignUp';

export const ModalManager = ({
  formType,
  isModalOpen,
  setIsModalOpen,
  switchForm,
}) => {
  if (!isModalOpen) return null;

  const sharedProps = { isModalOpen, setIsModalOpen };

  const forms = {
    signup: (
      <SignUp
        {...sharedProps}
        switchToSignIn={() => switchForm('signin')}
        switchToOwnerSignUp={() => switchForm('ownerSignUp')}
      />
    ),
    signin: (
      <SignIn
        {...sharedProps}
        switchToSignUp={() => switchForm('signup')}
        switchToForgotPassword={() => switchForm('forgotPassword')}
      />
    ),
    forgotPassword: (
      <ForgotPassword
        {...sharedProps}
        switchToSignIn={() => switchForm('signin')}
      />
    ),
    ownerSignUp: (
      <OwnerSignUp
        {...sharedProps}
        switchToSignIn={() => switchForm('signin')}
        switchToSignUp={() => switchForm('signup')}
      />
    ),
  };

  return forms[formType] || null;
};
