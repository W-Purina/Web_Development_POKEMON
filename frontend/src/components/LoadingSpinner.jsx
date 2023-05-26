import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => (
  <div>
    <BeatLoader color={"#123abc"} loading={true} size={20} />
  </div>
);

export default LoadingSpinner;
