import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <AccountBalanceWalletOutlined color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
            MyFinance
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
