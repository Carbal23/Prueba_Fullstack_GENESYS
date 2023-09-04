import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import { IPetsTableFilters, IPetsTableFilterValue } from 'src/sections/pets/types';
import Iconify from 'src/components/iconify';

type Props = StackProps & {
  filters: IPetsTableFilters;
  onFilters: (name: string, value: IPetsTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

export default function PetsTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
  const handleRemoveBreed = (inputValue: string) => {
    const newValue = filters.breed.filter((item) => item !== inputValue);
    onFilters('breed', newValue);
  };

  const handleRemoveSubBreed = (inputValue: string) => {
    const newValue = filters.breed.filter((item) => item !== inputValue);
    onFilters('subBreed', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.breed.length && (
          <Block label="Breed:">
            {filters.breed.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveBreed(item)} />
            ))}
          </Block>
        )}

        {!!filters.subBreed.length && (
          <Block label="SubBreed:">
            {filters.subBreed.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveSubBreed(item)}
              />
            ))}
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
