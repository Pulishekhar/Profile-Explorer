// src/services/api.js
let mockProfiles = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Software Engineer from New York",
    address: {
      text: "Brooklyn Bridge, New York, NY",
      coordinates: { lat: 40.7061, lng: -73.9903 }
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "UX Designer from London",
    address: {
      text: "Tower Bridge, London",
      coordinates: { lat: 51.5055, lng: -0.0754 }
    }
  }
];

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Only use named exports
export const fetchProfiles = async () => {
  await simulateDelay();
  return mockProfiles;
};

export const createProfile = async (profileData) => {
  await simulateDelay();
  const newProfile = {
    id: Math.max(...mockProfiles.map(p => p.id)) + 1,
    ...profileData
  };
  mockProfiles.push(newProfile);
  return newProfile;
};

export const updateProfile = async (id, profileData) => {
  await simulateDelay();
  mockProfiles = mockProfiles.map(p => 
    p.id === id ? { ...p, ...profileData } : p
  );
  return mockProfiles.find(p => p.id === id);
};

export const deleteProfile = async (id) => {
  await simulateDelay();
  mockProfiles = mockProfiles.filter(p => p.id !== id);
  return true;
};