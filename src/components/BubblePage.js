import React, { useEffect, useState } from 'react';
import Bubbles from './Bubbles';
import ColorList from './ColorList';
import fetchColors from '../helpers/fetchColors';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchColors()
      .then((data) => {
        setColorList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('fetchColorsError', err);
      });
  }, []);

  return (
    <div>
      <p>Loading...</p>

      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
