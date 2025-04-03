import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { AppContext } from "../context/AppContext";
import ProfileCard from "../components/ProfileCard";
import SearchFilter from "../components/SearchFilter";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { profiles, loading, error } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedLocation, setDebouncedLocation] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  // Debounce Effect to Optimize Filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setDebouncedLocation(filterLocation);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, filterLocation]);

  // Run Fuse.js Search when profiles or debounced values change
  useEffect(() => {
    if (!profiles || profiles.length === 0) {
      setFilteredProfiles([]);
      return;
    }

    const fuse = new Fuse(profiles, { keys: ["name", "address.text"], threshold: 0.3 });

    const searchQuery = `${debouncedSearch} ${debouncedLocation}`.trim();
    setFilteredProfiles(
      searchQuery ? fuse.search(searchQuery).map((result) => result.item) : profiles
    );
  }, [profiles, debouncedSearch, debouncedLocation]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8">Profiles Directory</h1>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
      />

      <div className="space-y-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }} // Staggered effect
            >
              <ProfileCard profile={profile} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="text-center py-8 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No profiles found matching your criteria
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
