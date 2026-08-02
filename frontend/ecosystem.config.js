require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
  DEPLOY_SSH_KEY,
  FRONTEND_STATIC_PATH,
  REACT_APP_API_URL,
} = process.env;

module.exports = {
  deploy: {
    production: {
      key: DEPLOY_SSH_KEY,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy': `export PATH=/home/practikum/.nvm/versions/node/v20.20.2/bin:$PATH && cd frontend && export NODE_OPTIONS=--openssl-legacy-provider && export SKIP_PREFLIGHT_CHECK=true && export REACT_APP_API_URL=${REACT_APP_API_URL} && npm ci && npm run build && mkdir -p ${FRONTEND_STATIC_PATH} && rm -rf ${FRONTEND_STATIC_PATH}/* && cp -R build/. ${FRONTEND_STATIC_PATH}/`,
    },
  },
};
