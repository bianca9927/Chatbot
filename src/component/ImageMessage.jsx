import './ImageMessage.css';
import React from 'react';

const ImageMessage = (props) => {
  const { imageUrl, imageAlt } = props;
console.log("组件内：",imageUrl,imageAlt)
  return (
      <img src={imageUrl} alt={imageAlt} />
  );
};

export default ImageMessage;
