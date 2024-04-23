import { useEffect, useState } from 'react';
import styles from "./ImageRotator.module.css"

export const ImageRotator = ({ image }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <img
      src={image}
      alt="Image"
      className={`${styles.image} ${loaded ? styles.show : ''}`} // Apply styles conditionally
    />
  );
};

