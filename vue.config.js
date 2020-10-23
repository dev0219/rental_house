module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: "8080",
    proxy: 'https://porter-1.nchill.xyz/appraisal/get?address_id=4KAX7NOO1lo3eRPJ&lookback=-1y',
  }
}