// src/components/AdminPanel.jsx
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { createProfile, updateProfile, deleteProfile } from '../services/api';
import ProfileCard from './ProfileCard';

const AdminPanel = () => {
  const { profiles, setProfiles } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    bio: '',
    address: { text: '', coordinates: { lat: 0, lng: 0 } }
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateProfile(editingId, formData);
        setProfiles(profiles.map(p => p.id === editingId ? updated : p));
      } else {
        const newProfile = await createProfile(formData);
        setProfiles([...profiles, newProfile]);
      }
      resetForm();
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      bio: '',
      address: { text: '', coordinates: { lat: 0, lng: 0 } }
    });
    setEditingId(null);
  };

  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Profile Manager</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Profile' : 'Create Profile'}
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
            <input type="text" placeholder="Bio" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
            <button type="submit">{editingId ? 'Update' : 'Create'}</button>
          </form>
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">Profiles</h2>
          <div className="space-y-4">
            {profiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={(profile) => {
                  setFormData(JSON.parse(JSON.stringify(profile)));
                  setEditingId(profile.id);
                }}
                onDelete={async () => {
                  await deleteProfile(profile.id);
                  setProfiles(profiles.filter(p => p.id !== profile.id));
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
