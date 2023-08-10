import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const fetchImages = async params => {
  try {
    const { data } = await axios.get('', {
      params: {
        key: '38181676-c389c3ce2b1eee7a286cf8f0e',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: 1,
        q: 'cat',
        ...params,
      },
    });
    return data;
  } catch {}
};
