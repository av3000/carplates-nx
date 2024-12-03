import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

import * as dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env['API_URL'] || 'http://localhost';
const ANGULAR_PORT = process.env['ANGULAR_PORT'] || '4200';
const NODE_PORT = process.env['NODE_PORT'] || '8080';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    baseUrl: `${API_URL}:${ANGULAR_PORT}`,
    env: {
      backendApiUrl: `${API_URL}:${NODE_PORT}`,
    },
  },
});
