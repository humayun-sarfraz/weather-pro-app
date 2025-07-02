import SidebarLocationButton from './SidebarLocationButton';
import SidebarQuickSwitcher from './SidebarQuickSwitcher';
import SidebarFavorites from './SidebarFavorites';
import SidebarRecentCities from './SidebarRecentCities';
import SidebarMiniForecast from './SidebarMiniForecast';
import SidebarAlerts from './SidebarAlerts';
import SidebarSunMoon from './SidebarSunMoon';
import SidebarMiniRadar from './SidebarMiniRadar';
import SidebarWeatherTips from './SidebarWeatherTips';
import SidebarShareExport from './SidebarShareExport';
import SidebarPinnedWidgets from './SidebarPinnedWidgets';
import SidebarNews from './SidebarNews';
import SidebarSocial from './SidebarSocial';
import SidebarSettings from './SidebarSettings';
import SidebarIntegrationShortcuts from './SidebarIntegrationShortcuts';

export default function Sidebar(props) {
  return (
    <aside className="sidebar-content p-3 d-flex flex-column gap-3">
      <SidebarLocationButton {...props} />
      <SidebarQuickSwitcher {...props} />
      <SidebarFavorites {...props} />
      <SidebarRecentCities {...props} />
      <SidebarMiniForecast {...props} />
      <SidebarAlerts {...props} />
      <SidebarSunMoon {...props} />
      <SidebarMiniRadar {...props} />
      <SidebarWeatherTips {...props} />
      <SidebarShareExport {...props} />
      <SidebarPinnedWidgets {...props} />
      <SidebarNews {...props} />
      <SidebarSocial {...props} />
      <SidebarSettings {...props} />
      <SidebarIntegrationShortcuts {...props} />
    </aside>
  );
}
