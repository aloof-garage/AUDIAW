import { ArrangementView } from '../ArrangementView/ArrangementView';
import { Timeline } from '../Timeline/Timeline';
import { AutomationView } from './AutomationView';
import { ChannelRack } from './ChannelRack';
import { DeviceRack } from './DeviceRack';
import { PianoRoll } from './PianoRoll';
import { RoutingView } from './RoutingView';
import { SessionView } from './SessionView';
import { SettingsView } from './SettingsView';
import { useUIStore } from '../../stores/uiStore';

export const MainWorkspace = () => {
  const { activeView } = useUIStore();

  if (activeView === 'session') return <SessionView />;
  if (activeView === 'piano-roll') return <PianoRoll />;
  if (activeView === 'channel-rack') return <ChannelRack />;
  if (activeView === 'devices') return <DeviceRack />;
  if (activeView === 'automation') return <AutomationView />;
  if (activeView === 'routing') return <RoutingView />;
  if (activeView === 'settings') return <SettingsView />;

  return (
    <>
      <Timeline />
      <ArrangementView />
    </>
  );
};

// Made with Bob
