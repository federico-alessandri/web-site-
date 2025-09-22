import { useState } from 'react';
import { mockSupabase } from '../lib/supabase';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitContactMessage = async (messageData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await mockSupabase.submitContactMessage(messageData);
      
      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetStatus = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    loading,
    error,
    success,
    submitContactMessage,
    resetStatus
  };
};

