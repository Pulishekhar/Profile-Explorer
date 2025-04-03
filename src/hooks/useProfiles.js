import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useProfiles = () => {
  const { profiles, isLoading, error } = useContext(AppContext);
  return { profiles, isLoading, error };
};