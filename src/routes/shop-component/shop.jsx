import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview-component';
import Category from '../category/category-component';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';
import {setCategories} from '../../store/categories/category-action';
import { fetchCategoriesStart } from '../../store/categories/category-action';
import "./products-styles.scss";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(fetchCategoriesStart());
},[])
  return (
    <Routes>
        <Route index element={<CategoriesPreview/>} />
        <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
