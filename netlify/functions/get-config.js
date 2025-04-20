exports.handler = async () => ({
  statusCode: 200,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    appId: process.env.BACK4APP_APPLICATION_ID || "YBahylKUfN5KUJTEx5i78YR7GXmMLF5hbTEnHudl",
    jsKey: process.env.BACK4APP_JAVASCRIPT_KEY || "h2Fz4wXX6C5MQPyhWm7JumYK0eoeUoqjORDSdabs",
    serverURL: process.env.BACK4APP_SERVER_URL || "https://parseapi.back4app.com",
  }),
})
