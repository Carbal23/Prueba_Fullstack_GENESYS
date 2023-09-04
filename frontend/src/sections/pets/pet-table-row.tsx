import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';

import { ConfirmDialog } from 'src/components/custom-dialog';
import { IPet } from 'src/context/pets/types';

type Props = {
  selected: boolean;
  row: IPet;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function PetsTableRow({ row, selected, onSelectRow, onDeleteRow }: Props) {
  const { name, age, sex, breed, subBreed } = row;

  const confirm = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{age}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{sex}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{breed.name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{subBreed ? subBreed.name : 'N/A'}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color={confirm.value ? 'inherit' : 'default'}
              onClick={() => {
                confirm.onTrue();
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
