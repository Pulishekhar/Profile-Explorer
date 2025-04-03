// src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import MapViewer from '../components/MapViewer';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles } = useContext(AppContext);
  
  const profile = profiles.find(p => p.id === parseInt(id));

  if (!profile) {
    return (
      <div className="p-4 text-red-500">
        Profile not found
        <button 
          onClick={() => navigate('/')}
          className="ml-4 text-blue-500"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Back
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
            <p className="text-gray-600 mb-4">{profile.bio}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Address</h2>
              <p className="text-gray-700">{profile.address.text}</p>
            </div>
            
            <div className="h-64">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <MapViewer 
                coordinates={profile.address.coordinates}
                address={profile.address.text}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;