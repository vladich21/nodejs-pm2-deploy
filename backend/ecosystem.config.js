require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
  DEPLOY_SSH_KEY,
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'api-service',
      script: './dist/app.js',
      autorestart: true,
      env_production: {
        NODE_ENV,
      },
    },
  ],

  deploy: {
    production: {
      key: DEPLOY_SSH_KEY,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -i ${DEPLOY_SSH_KEY} ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend/.env`,
      'post-deploy': 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"; cd backend && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
