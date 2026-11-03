import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ApiStatusCard } from '../../components/ApiStatusCard';

// Placeholder until Phase 4 builds the real dashboard.
export function DashboardPage() {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Typography color="text.secondary">Your monthly finances at a glance.</Typography>
      </div>
      <ApiStatusCard />
    </Stack>
  );
}
