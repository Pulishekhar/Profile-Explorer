// src/components/ProfileList.jsx
import { useProfiles } from '../hooks/useProfiles';
import React, { useState, useEffect } from 'react';
import { fetchProfiles } from '../services/api';

import ProfileCard from './ProfileCard'; // Make sure this is default import
import { LoadingSpinner } from './LoadingSpinner';

export const ProfileList = ({ onSelectProfile }) => {
  const { profiles, isLoading } = useProfiles();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id}
          profile={profile}
          onShowMap={() => onSelectProfile(profile)} // Ensure this is a function
        />
      ))}
    </div>
  );
};