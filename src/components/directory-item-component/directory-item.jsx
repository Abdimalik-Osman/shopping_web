import React from 'react';
import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';
function DirectoryItem({category}) {
    const {title,imgUrl, route} = category;
    const navigate = useNavigate();
    const useNavigateHandler = () => navigate(route);
  return (
    <div className='directory-item-container' onClick={useNavigateHandler}>
          <div className='background-image' style={{backgroundImage:`url(${imgUrl})`}} />
          <div className='directory-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
  )
}

export default DirectoryItem;