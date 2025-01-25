import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'


// Define a dynamic proxy based on the environment
const getProxyOptions = (mode: any) => {
	// Load environment variables
	const env = loadEnv(mode, process.cwd());	
  
	return {
	  '^/(app|api|assets|files|private)': {
		target: mode === 'development' ? env.VITE_API_DOMAIN : undefined, // Use VITE_API_DOMAIN in development
		changeOrigin: true,
		ws: true,
		router: (req: any) => {
		  // Use the current host during production builds
		  if (mode === 'production') {
			const siteName = req.headers.host.split(':')[0];
			return `http://${siteName}`;
		  }
		  return env.VITE_API_DOMAIN;
		},
	  },
	};
  };

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const proxyOptions = getProxyOptions(mode);
  
	return {
	  plugins: [react()],
	  server: {
		proxy: proxyOptions,
	  },
	  resolve: {
		alias: {
		  '@': path.resolve(__dirname, 'src'),
		},
	  },
	  build: {
		outDir: '../cn_mobile_crm/public/mobile_crm',
		emptyOutDir: true,
		target: 'es2015',
	  },
	};
  });