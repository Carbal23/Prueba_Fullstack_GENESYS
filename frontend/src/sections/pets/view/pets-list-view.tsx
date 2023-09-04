import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
import { usePetsContext } from 'src/context/pets/hooks';
import { useBreedContext } from 'src/context/breeds/hooks';
import { IPet } from 'src/context/pets/types';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { ROOTS } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { LoadingScreen } from 'src/components/loading-screen';
import { IPetsTableFilterValue, IPetsTableFilters } from 'src/sections/pets/types';
import PetsTableFiltersResult from '../pets-table-filters-result';
import PetCreateForm from '../pet-create-form';
import PetsTableRow from '../pet-table-row';
import BreedCreateForm from '../breed-create-form';
import PetsTableToolbar from '../pets-table-toolbar';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'NAME' },
  { id: 'age', label: 'AGE', width: 180 },
  { id: 'sex', label: 'SEX', width: 220 },
  { id: 'breed', label: 'BREED', width: 180 },
  { id: 'subBreed', label: 'SUBBREED', width: 180 },
  { id: '', width: 88 },
];

const defaultFilters: IPetsTableFilters = {
  name: '',
  breed: [],
  subBreed: [],
};
// ----------------------------------------------------------------------

export default function PetsListView() {
  const { pets, loading, getPetsAction, deletePetAction, multipleDeletePetsAction } =
    usePetsContext();

  const { breeds, getBreedsAction } = useBreedContext();
  const subBreeds = breeds.map((breed) => breed.subBreeds);
  const flattenedSubBreeds = subBreeds.reduce(
    (accumulator, currentSubBreeds) => accumulator.concat(currentSubBreeds),
    []
  );

  useEffect(() => {
    getPetsAction();
    getBreedsAction();
  }, [getPetsAction, getBreedsAction]);

  const createPet = useBoolean();
  const createBreed = useBoolean();

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: pets,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IPetsTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: number) => {
      deletePetAction(id);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [table, dataInPage.length, deletePetAction]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteIds = pets.filter((row) => table.selected.includes(row.id)).map((row) => row.id);

    multipleDeletePetsAction(deleteIds);

    table.onUpdatePageDeleteRows({
      totalRows: pets.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataInPage.length, table, dataFiltered.length, pets, multipleDeletePetsAction]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
              heading="Pets list"
              links={[{ name: 'Dashboard', href: ROOTS.DASHBOARD }, { name: 'petsList' }]}
              action={
                <>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={createPet.onTrue}
                    style={{ marginRight: '16px' }}
                  >
                    New Pet
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={createBreed.onTrue}
                  >
                    New Breed
                  </Button>
                </>
              }
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
            <Card>
              <PetsTableToolbar
                filters={filters}
                onFilters={handleFilters}
                breedOptions={breeds}
                subBreedOptions={flattenedSubBreeds}
              />

              {canReset && (
                <PetsTableFiltersResult
                  filters={filters}
                  onFilters={handleFilters}
                  onResetFilters={handleResetFilters}
                  results={dataFiltered.length}
                  sx={{ p: 2.5, pt: 0 }}
                />
              )}

              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  numSelected={table.selected.length}
                  rowCount={pets.length}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      pets.map((row) => row.id as number)
                    )
                  }
                  action={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={confirm.onTrue}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  }
                />

                <Scrollbar>
                  <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={pets.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          pets.map((row) => row.id)
                        )
                      }
                    />

                    <TableBody>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <PetsTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        emptyRows={emptyRows(table.page, table.rowsPerPage, pets.length)}
                      />

                      <TableNoData notFound={notFound} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={dataFiltered.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              />
            </Card>
          </Container>

          <PetCreateForm open={createPet.value} onClose={createPet.onFalse} />
          <BreedCreateForm open={createBreed.value} onClose={createBreed.onFalse} />

          <ConfirmDialog
            open={confirm.value}
            onClose={confirm.onFalse}
            title="Delete"
            content={
              <>
                Are you sure want to delete <strong> {table.selected.length} </strong> items?
              </>
            }
            action={
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteRows();
                  confirm.onFalse();
                }}
              >
                Delete
              </Button>
            }
          />
        </>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IPet[];
  comparator: (a: any, b: any) => number;
  filters: IPetsTableFilters;
}) {
  const { name, breed, subBreed } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (pet) => pet.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (breed.length) {
    inputData = inputData.filter((pet) => breed.includes(pet.breed.name));
  }

  if (subBreed.length) {
    inputData = inputData.filter((pet) => subBreed.includes(pet.subBreed?.name as string));
  }

  return inputData;
}
