export const corsOptions = {
  origin: `${process.env.SERVER_URL}:${process.env.F_PORT}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessfulStatus: 200
}