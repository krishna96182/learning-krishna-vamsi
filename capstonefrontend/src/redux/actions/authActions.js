import axios from 'axios';

// Define the action type
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

// Async action creator using thunk
export const register = (formData) => async (dispatch) => {
  try {
    console.log("At Actions: ", formData)
    const response = await axios.post('http://localhost:3000/api/auth/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data, // Pass the successful response data
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response ? error.response.data : 'Registration failed',
    });
  }
};
