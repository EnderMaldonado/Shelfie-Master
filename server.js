require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const koaBodyParse = require('koa-bodyparser');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');
const Cookies = require('js-cookie')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev:true });
const handle = app.getRequestHandler();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
  SHOP,
  API_VERSION
} = process.env;

const firebaseApi = require('./custom_modules/firebase-api');

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session(server));

  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products', 'shop'],
      async afterAuth(ctx) {
        try {
          const { shop, accessToken } = ctx.session;
          ctx.cookies.set("shopOrigin", shop, { httpOnly: false });

          //Initialize Database and add access tocken.
          firebaseApi.initializeDBCreateAccessToken(accessToken)

          const registration = await registerWebhook({
            address: `${HOST}/webhooks/products/update`,
            topic: 'PRODUCTS_UPDATE',
            accessToken,
            shop,
            apiVersion: API_VERSION
          });

          if (registration.success) {
            console.log('Successfully registered webhook!');
          } else {
            console.log('Failed to register webhook', registration.result);
          }

          await getSubscriptionUrl(ctx, accessToken, shop);
        } catch (e) {
          console.log(e)
        }
      }
    })
  );

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  router.post('/webhooks/orders/cancelled', webhook, async (ctx) => {
    try {
      console.log('\n\n: ', ctx.state.webhook)
    } catch (e) {
      console.log(e)
    }
  });

  server.use(graphQLProxy({ version: API_VERSION }));

  router.get('*', verifyRequest(), async (ctx) => {
    try {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
      return;
    } catch (e) {
      console.log(e)
    }
  });

  const routers = require('./custom_modules/routers')(router)

  server.use(koaBodyParse());
  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
