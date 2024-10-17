import drfProvider from 'ra-data-django-rest-framework';
const dataProvider = drfProvider(import.meta.env.VITE_REST_API_URL + '/api');
export default dataProvider;