import IConstants from "../interfaces/constants";

const ENV = (process.env.NODE_ENV as string) || "development";

const constants: IConstants = {
  test: ENV === "test",
  dev: ENV === "development",
  prod: ENV === "production",
  apiKey: process.env.NEXT_PUBLIC_APIKEY as string,
  beHost: process.env.NEXT_PUBLIC_BE_HOST as string,
  cloudName: process.env.NEXT_PUBLIC_CLOUDNAME as string,
  apiSecret: process.env.NEXT_PUBLIC_APISECRET as string,
  defaultImg: process.env.NEXT_PUBLIC_DEFAULT_IMG as string,
  graphqlBaseUrl: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL as string,
  cloudEndPoint: process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT as string,
  reduxStoreSecretKey: process.env.NEXT_PUBLIC_REDUX_SECRET_KEY as string,  
  reduxStorePersistenceKey: process.env.NEXT_PUBLIC_REDUX_PERSISTENCE_KEY as string,
};

export default constants;
