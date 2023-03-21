import { useNavigate } from 'react-router-dom';

function HandleApiError({ error }) {
  console.log('in');
  const navigate = useNavigate();
  if (error.response && error.response.status === 401) {
    localStorage.clear();
    navigate('/register');
  }

  return null;
}

export default HandleApiError;
