import React, { useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { getAll, getAllByTag, getAllTags, search } from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';

const initialState = { foods: [], tags: [], loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload, loading: false };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload, loading: false };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags, loading } = state;
  const { searchTerm, tag } = useParams();

  const loadFoods = useCallback(async () => {
    try {
      return tag ? await getAllByTag(tag) : searchTerm ? await search(searchTerm) : await getAll();
    } catch (error) {
      console.error('Error loading foods:', error);
      return [];
    }
  }, [searchTerm, tag]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = await getAllTags();
        dispatch({ type: 'TAGS_LOADED', payload: fetchedTags });

        const fetchedFoods = await loadFoods();
        dispatch({ type: 'FOODS_LOADED', payload: fetchedFoods });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, tag, loadFoods]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {loading && <p>Loading...</p>}
      {!loading && foods.length === 0 && <NotFound linkText="Reset Search" />}
      {!loading && <Thumbnails foods={foods} />}
    </>
  );
}
