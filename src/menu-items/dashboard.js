// assets
import { IconDashboard, IconSpeakerphone } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconSpeakerphone };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'seminar',
      title: 'Seminar',
      type: 'item',
      url: '/seminar',
      icon: icons.IconSpeakerphone,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
