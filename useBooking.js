import { useState } from 'react';
import { mockSupabase } from '../lib/supabase';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitBookingRequest = async (bookingData) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await mockSupabase.submitBookingRequest(bookingData);
      
      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = async (startDate, endDate, guests) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await mockSupabase.calculatePrice(startDate, endDate, guests);
      
      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await mockSupabase.getAvailability(startDate, endDate);
      
      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitBookingRequest,
    calculatePrice,
    checkAvailability
  };
};

