require("dotenv").config()
const withCSS = require('@zeit/next-css')
const webpack = require('webpack')

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY)
const shopOrigin = JSON.stringify(process.env.SHOP)

module.exports = withCSS({
  webpack: (config) => {
    
    const env = { API_KEY: apiKey }
    config.plugins.push(new webpack.DefinePlugin(env))

    const envShop = {SHOP_ORIGIN: shopOrigin }
    config.plugins.push(new webpack.DefinePlugin(envShop))

    return config;
  },
})
