import React from 'react';
import useUserStore from './useUserStore'; // Import the user store

function UserProfile() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      {/* Render user data */}
    </div>
  );
}

export default UserProfile;
