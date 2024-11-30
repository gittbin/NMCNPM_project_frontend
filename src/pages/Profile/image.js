import React from 'react';

const ProfilePictureOptions = (image) => {

  const handleChooseProfilePicture = () => {
    alert("Choose profile picture clicked!");
  };

  return (
    <div style={styles.container}>
      <button style={styles.button}>
        <a href={image.image} target="_blank"><span style={styles.icon}>👤</span> See profile picture</a>
        
      </button>
      <button style={styles.button} onClick={handleChooseProfilePicture}>
        <span style={styles.icon}>🖼️</span> Choose profile picture
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#181818',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    position: 'absolute',
    zIndex:10000,
    top:"207px",
    left:"20%"
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
  },
};

export default ProfilePictureOptions;