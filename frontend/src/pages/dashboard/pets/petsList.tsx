import { Helmet } from 'react-helmet-async';
// sections
import { PetsListView } from 'src/sections/pets/view';

// ----------------------------------------------------------------------

export default function PetsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Pets List</title>
      </Helmet>

      <PetsListView />
    </>
  );
}
