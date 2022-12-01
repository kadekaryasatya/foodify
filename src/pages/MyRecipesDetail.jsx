import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { getNotes } from '../utils/api';
import { showFormattedDate } from '../utils/api';
import NotFound from './NotFound';

// import LocaleContext from '../contexts/LocaleContext';
// import { ClimbingBoxLoader } from 'react-spinners';

import './MyRecipesDetail.css';

function MyRecipesDetail() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  // const { locale } = useContext(LocaleContext);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes(id).then(({ data }) => {
      setRecipe(data);
    });
  }, [id]);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  if (!recipe) {
    return <NotFound />;
  }
  return (
    <section className='myrecipes-detail'>
      {/* <Link to='/' title='Back'>
        <HiArrowLeft /> {locale === 'id' ? 'Kembali' : 'Back'}
      </Link> */}
      <div className='myrecipes-detail__image-box'>
        <img className='myrecipes-detail__image' src='../detail.png' alt='recipe' />
      </div>
      <h2 className='myrecipes-detail__title'>{recipe.title}</h2>
      <p className='myrecipes-detail__createdAt'>{showFormattedDate(recipe.createdAt)}</p>
      <h4>Description</h4>
      <div className='myrecipes-detail__body'>
        <p>{recipe.body}</p>
      </div>
    </section>
  );
}

export default MyRecipesDetail;