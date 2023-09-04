import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { usePetsContext } from 'src/context/pets/hooks';
import { IAddPet, ISubBreedPet, Sex } from 'src/context/pets/types';
import { useBreedContext } from 'src/context/breeds/hooks';
import { IGetBreedPet } from 'src/context/breeds/types';

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function PetCreateForm({ open, onClose }: Props) {
  const [selectedBreed, setSelectedBreed] = useState<IGetBreedPet | null>(null);
  const [selectedSubBreed, setSelectedSubBreed] = useState<ISubBreedPet | null>(null);
  const [SubBreedOptions, setSubBreedOptions] = useState<ISubBreedPet[]>([]);

  const { addPetAction } = usePetsContext();

  const { breeds } = useBreedContext();
  const subBreeds = breeds.map((breed) => breed.subBreeds);
  const flattenedSubBreeds = subBreeds.reduce(
    (accumulator, currentSubBreeds) => accumulator.concat(currentSubBreeds),
    []
  );

  const sexOptions = ['Male', 'Female'];

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .required('Age is required')
      .positive('Age must be a positive number')
      .integer('Age must be an integer'),
    sex: Yup.string()
      .required('Sex is required')
      .oneOf(['Female', 'Male'], 'The value of sex must be "female" or "male'),
    breed: Yup.object().shape({
      id: Yup.number().required('Breed is required'),
      name: Yup.string().required('Breed name is required'),
    }),
    subBreed: Yup.object().nullable(),
  });

  const defaultValues = {
    name: '',
    age: 0,
    sex: '',
    breed: { id: 0, name: '' },
    subBreed: { id: 0, name: '' },
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
    if (sexOptions.includes(data.sex)) {
      const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
      const pet: IAddPet = {
        name: formattedName,
        age: data.age,
        sex: data.sex as Sex,
        breedId: selectedBreed?.id as number,
        subBreedId: selectedSubBreed?.id as number,
      };
      addPetAction(pet);
      reset();
      setSelectedBreed(null);
      setSelectedSubBreed(null);
      onClose();
    } else {
      console.error('Invalid value for sex:', data.sex);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={() => {
        setSelectedBreed(null);
        setSelectedSubBreed(null);
        reset();
        onClose();
      }}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Create pet</DialogTitle>

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
            <RHFTextField name="age" label="Age" type="number" />
            <RHFAutocomplete
              name="sex"
              label="Sex"
              options={sexOptions}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                sexOptions.filter((sex) => sex === option)[0];

                return (
                  <li {...props} key={option}>
                    {option}
                  </li>
                );
              }}
            />
            <RHFAutocomplete
              name="breed"
              label="Breed"
              options={breeds}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                // examplebreeds.filter((breed) => breed === option)[0];
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, newValue) => {
                setSelectedBreed(newValue as IGetBreedPet);
                methods.setValue('breed', newValue as IGetBreedPet);

                const subBreedsForSelectedBreed = flattenedSubBreeds.filter(
                  (subBreed) => subBreed.breedId === (newValue as IGetBreedPet).id
                );

                setSubBreedOptions(subBreedsForSelectedBreed);
              }}
              value={selectedBreed || null} // Establece el valor seleccionado
            />

            <RHFAutocomplete
              name="subBreed"
              label="SubBreed"
              options={SubBreedOptions}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              disabled={!selectedBreed}
              onChange={(event, newValue) => {
                setSelectedSubBreed(newValue as ISubBreedPet);
                methods.setValue('subBreed', newValue as ISubBreedPet);
              }}
              value={selectedSubBreed || null}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedBreed(null);
              setSelectedSubBreed(null);
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
