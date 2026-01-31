import { isChromium } from '../../utils';

export default async function idleDetector(): Promise<boolean> {
  if (!isChromium()) {
    return false;
  }

  const w = window as Window & { chrome?: { runtime?: unknown } };
  return (
    'IdleDetector' in window &&
    !(
      'ImageTrack' in window ||
      'Scheduler' in window ||
      'Magnetometer' in window
    ) &&
    !('chrome' in w && w.chrome && 'runtime' in w.chrome)
  );
}
