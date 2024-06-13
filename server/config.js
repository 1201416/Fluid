module.exports = {
  port: 4000,

  databaseURL: "mongodb://127.0.0.1:27017/Boards",

  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  api: {
    prefix: '/api',
  },
};
