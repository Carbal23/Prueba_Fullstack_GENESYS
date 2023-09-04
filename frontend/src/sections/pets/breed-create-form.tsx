import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { IconButton, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { IAddBreedPet, IAddSubBreedPet } from 'src/context/pets/types';
import Iconify from 'src/components/iconify/iconify';
import { useBreedContext } from 'src/context/breeds/hooks';

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function BreedCreateForm({ open, onClose }: Props) {
  const { addBreedAction } = useBreedContext();
  const [subBreeds, setSubBreeds] = useState<IAddSubBreedPet[]>([]);
  const [subBreedInput, setSubBreedInput] = useState<string>('');

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    subBreeds: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('SubBreed name is required'),
      })
    ),
  });

  const defaultValues = {
    name: '',
    subBreeds: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
    const breed: IAddBreedPet = {
      name: formattedName,
      subBreeds,
    };
    addBreedAction(breed);
    setSubBreeds([]);
    setSubBreedInput('');
    reset();
    onClose();
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={() => {
        setSubBreeds([]);
        setSubBreedInput('');
        reset();
        onClose();
      }}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Create Breed</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
            <RHFTextField name="name" label="Name" />
            <RHFTextField
              name="subBreedInput"
              label="SubBreed"
              value={subBreedInput}
              onChange={(e) => setSubBreedInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (subBreedInput.trim() !== '') {
                          const formatteSubBreedName =
                            subBreedInput.charAt(0).toUpperCase() +
                            subBreedInput.slice(1).toLowerCase();
                          setSubBreeds([...subBreeds, { name: formatteSubBreedName }]);
                          setSubBreedInput('');
                        }
                      }}
                      edge="end"
                    >
                      <Iconify icon="mingcute:add-line" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {subBreeds.length > 0 && (
            <Box textAlign="center">
              {' '}
              <DialogTitle>Added SubBreeds</DialogTitle>
            </Box>
          )}

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            {subBreeds.map((subBreed, index) => (
              <Box key={index} sx={{ display: { xs: 'block', sm: 'block' } }}>
                {subBreed.name}
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setSubBreeds([]);
              setSubBreedInput('');
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
