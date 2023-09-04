import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPetsTableFilterValue, IPetsTableFilters} from 'src/sections/pets/types';
import Iconify from 'src/components/iconify';
import { IGetBreedPet } from 'src/context/breeds/types';
import { ISubBreedPet } from 'src/context/pets/types';

type Props = {
  filters: IPetsTableFilters;
  onFilters: (name: string, value: IPetsTableFilterValue) => void;
  breedOptions: IGetBreedPet[];
  subBreedOptions: ISubBreedPet[];
};

export default function PetsTableToolbar({
  filters,
  onFilters,
  breedOptions,
  subBreedOptions
}: Props) {

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterBreed = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'breed',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterSubBreed = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'subBreed',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  return (
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Breed</InputLabel>

          <Select
            multiple
            value={filters.breed}
            onChange={handleFilterBreed}
            input={<OutlinedInput label="Breed" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {breedOptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                <Checkbox disableRipple size="small" checked={filters.breed.includes(option.name)} />
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>SubBreed</InputLabel>

          <Select
            multiple
            value={filters.subBreed}
            onChange={handleFilterSubBreed}
            input={<OutlinedInput label="SubBreed" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {subBreedOptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                <Checkbox disableRipple size="small" checked={filters.subBreed.includes(option.name)} />
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.name}
            onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
  );
}
