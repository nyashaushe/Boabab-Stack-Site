import '@/styles/globals.css'; // Updated to use path alias
import type { AppProps } from 'next/app';
import MainLayout from '@/components/layout/MainLayout'; // Updated to use path alias
import { ToastProvider } from '@/contexts/ToastContext'; // Added ToastProvider import

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider> {/* Wrapped with ToastProvider */}
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ToastProvider>
  );
}

export default MyApp;
