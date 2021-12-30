import HomeConnected from '@/components/home/HomeConnected';
import HomeNotConnected from '@/components/home/HomeNotConnected';
import useConnected from '@/hooks/selectors/useConnected';

export default function HomeScreen() {
  const connected = useConnected();

  return connected ? <HomeConnected /> : <HomeNotConnected />;
}
