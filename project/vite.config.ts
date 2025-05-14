import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'node:dns';

// On Node.js 17+, by default, DNS resolution reorders results from system default to make IPv6 addresses appear first. 
// This can cause issues when trying to connect to localhost via WebSocket.
// Setting dns.setDefaultResultOrder('verbatim') disables this reordering.
// See: https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses, including LAN and public addresses.
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
