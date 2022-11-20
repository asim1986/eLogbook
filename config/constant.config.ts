import IConstants from "../interfaces/constants";

const constants: IConstants = {
  beHost: process.env.NEXT_PUBLIC_BE_HOST as string,
  defaultImg: process.env.DEFAULT_IMG as string,
  graphqlBaseUrl: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL as string,
  reduxStorePersistenceKey: process.env.NEXT_PUBLIC_REDUX_PERSISTENCE_KEY as string,
  reduxStoreSecretKey: process.env.NEXT_PUBLIC_REDUX_SECRET_KEY as string,
};

export default constants;