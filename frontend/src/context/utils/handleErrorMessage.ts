import { enqueueSnackbar } from 'notistack';

const handleErrorMessage = (error: any) => {
  if (Array.isArray(error.message) && error.message.length > 0) {
    // Mostrar el primer mensaje de error del backend
    enqueueSnackbar(error.message[0], {
      variant: 'error',
    });
  } else {
    // Error de conexión o similar
    enqueueSnackbar('Connection error, please try again later', {
      variant: 'error',
    });
  }
};

export default handleErrorMessage;
