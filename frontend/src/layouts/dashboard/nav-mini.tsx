import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { hideScroll } from 'src/theme/css';
import { NavSectionMini } from 'src/components/nav-section';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton } from '../_common';

export default function NavMini() {

  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <NavSectionMini
          data={navData}
          config={{
            currentRole: 'admin',
          }}
        />
      </Stack>
    </Box>
  );
}
