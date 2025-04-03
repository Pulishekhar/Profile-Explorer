import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AppContext.Provider value={{
      profiles,
      setProfiles,
      selectedLocation,
      setSelectedLocation,
      searchTerm,
      setSearchTerm,
      isLoading,
      setIsLoading,
      error,
      setError
    }}>
      {children}
    </AppContext.Provider>
  );
};