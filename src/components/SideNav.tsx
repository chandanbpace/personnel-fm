import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import type { SvgIconComponent } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useLocation } from 'react-router';

interface NavItem {
  label: string;
  to: string;
  Icon: SvgIconComponent;
}

// Later phases add Budgets, Savings, Recurring, Loans and Reports here.
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/', Icon: DashboardOutlined },
  { label: 'Transactions', to: '/transactions', Icon: ReceiptLongOutlined },
  { label: 'Accounts', to: '/accounts', Icon: AccountBalanceOutlined },
  { label: 'Categories', to: '/categories', Icon: CategoryOutlined },
  { label: 'Settings', to: '/settings', Icon: SettingsOutlined },
];

export function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <List component="nav" aria-label="Main" sx={{ px: 1 }}>
      {NAV_ITEMS.map(({ label, to, Icon }) => (
        <ListItemButton
          key={to}
          component={NavLink}
          to={to}
          end={to === '/'}
          selected={isActive(to)}
          onClick={onNavigate}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Icon color={isActive(to) ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  );
}
