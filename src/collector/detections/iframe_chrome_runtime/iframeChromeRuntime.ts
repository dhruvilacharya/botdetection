import IframeContext from '../../IframeContext';

export default async function iframeChromeRuntime(): Promise<boolean> {
  const iframeWindow = IframeContext.getInstance().getWindow();

  if (iframeWindow === null) {
    return false;
  }

  return Boolean(
    'chrome' in iframeWindow &&
    iframeWindow.chrome &&
    'runtime' in iframeWindow.chrome &&
    iframeWindow.chrome.runtime &&
    'connect' in iframeWindow.chrome.runtime
  );
}
