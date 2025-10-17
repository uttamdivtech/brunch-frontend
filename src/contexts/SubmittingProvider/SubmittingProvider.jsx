import { useState } from 'react';
import { SubmittingContext } from '../ContextCreator';

export const SubmittingProvider = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <SubmittingContext.Provider value={{ isSubmitting, setIsSubmitting }}>
      {children}
    </SubmittingContext.Provider>
  );
};
