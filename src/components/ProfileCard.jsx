import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfileCard = ({ profile, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const mapUrl = `https://www.google.com/maps?q=${profile.address.coordinates.lat},${profile.address.coordinates.lng}`;

  return (
    <motion.div
      className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-lg transition-shadow bg-white"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        {/* Lazy Loaded Image */}
        <img
          src={profile.image}
          alt={profile.name}
          loading="lazy"
          className="w-16 h-16 rounded-full object-cover shadow-md"
        />
        
        <div className="flex-1">
          <h3
            className="font-bold text-lg cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => navigate(`/profile/${profile.id}`)}
          >
            {profile.name}
          </h3>
          <p className="text-gray-600">{profile.bio}</p>
          <p className="text-sm text-gray-500 mt-1">{profile.address.text}</p>

          {/* Buttons */}
          <div className="mt-3 flex space-x-2">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm shadow-md hover:bg-blue-600 transition"
            >
              View on Map
            </a>
            <button
              onClick={() => navigate(`/profile/${profile.id}`)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition"
            >
              Details
            </button>
          </div>
        </div>

        {/* Edit & Delete Actions */}
        {onEdit && onDelete && (
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onEdit(profile)}
              className="text-blue-500 hover:text-blue-700 text-sm transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(profile.id)}
              className="text-red-500 hover:text-red-700 text-sm transition"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
