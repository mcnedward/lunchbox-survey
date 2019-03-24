export default function handleError(errorData, type) {
  let error;
  if (errorData.response) {
    error = errorData.response.data;
  } else {
    error = errorData.message || 'Something went terribly wrong.'
  }
  return { type, data: error };
}