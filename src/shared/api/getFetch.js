import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '33107811-a5d6527529a2edb6bc3062098',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchPosts = (q, page = 1) => {
  return instance.get('/', {
    params: {
      q,
      page,
      per_page: 12,
    },
  });
};
