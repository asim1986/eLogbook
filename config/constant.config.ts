import IConstants from "../interfaces/constants";

const ENV = (process.env.NODE_ENV as string) || "development";

const constants: IConstants = {
  beHost: process.env.NEXT_PUBLIC_BE_HOST as string,  
  defaultImg: process.env.DEFAULT_IMG as string,
  graphqlBaseUrl: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL as string,
  reduxStorePersistenceKey: process.env.NEXT_PUBLIC_REDUX_PERSISTENCE_KEY as string,
  reduxStoreSecretKey: process.env.NEXT_PUBLIC_REDUX_SECRET_KEY as string,
  dev: ENV === "development",
  prod: ENV === "production",
  test: ENV === "test",
};

export default constants;