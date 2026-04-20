import { seedAll } from './bootstrap/seed';

export default {
  register() {},

  async bootstrap({ strapi }) {
    if (process.env.SEED_ON_BOOTSTRAP === 'true') {
      strapi.log.info('[bootstrap] SEED_ON_BOOTSTRAP=true, starting seed...');
      await seedAll(strapi);
      strapi.log.info('[bootstrap] Seed finished.');
    }
  }
};
