import React from 'react'
import DirectoryItem from '../directory-item-component/directory-item';
import '../directory-component/directory.styles.scss';
import hatsImg  from '../../components/images/hats.png';
import jacketsImg  from '../../components/images/jackets.png';
import sneakersImg  from '../../components/images/sneakers.png';
import mensImg  from '../../components/images/men.png';
import womensImg  from '../../components/images/womens.png';

function Directory() {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      imgUrl:hatsImg,
      route: 'shop/hats'
    },
    {
      id: 2,
      title: 'Jackets',
      imgUrl: jacketsImg,
      route: 'shop/jackets'
    },
    {
      id: 3,
      title: 'Sneakers',
      imgUrl: sneakersImg,
      route: 'shop/sneakers'
    },
    {
      id: 4,
      title: 'Womens',
      imgUrl: womensImg,
      route: 'shop/womens'
    },
    {
      id: 5,
      title: 'Mens',
      imgUrl: mensImg,
      route: 'shop/mens'
    },
  ];

  return (
   <div className="directory-container">
     {categories.map((category) => (
        <DirectoryItem
        key={category.id} 
        category={category} />
      ))}   
   </div>
  )
}

export default Directory