import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { InMemoryCache } from 'apollo-cache-inmemory'

export function withApollo (PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  }

  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());
    let pageProps = {};
    if(PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    if(typeof window === "undefined") {
      if ( ctx.res && ctx.res.finished) {
        return pageProps;
      }

      //If on Server
      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }} />
        )
      } catch (err) {
        console.error(err);
      }

      Head.rewind();
    }
    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState
    }
  }


  return WithApollo;
}

//ssrMode 'u yuklenen sayfanin yuklenip yuklenmedigine ayarliyoruz. Yani sayfa yuklenmisse ssrMode TRUE olur yuklenmemisse false olur.
//Ve biz bunu tarayicida gormek icin bu sekilde degiskene atayip ApolloClient degiskenine esitliyoruz.
const initApolloClient = (initialState = {}) => {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState)

  const client = new ApolloClient({
    ssrMode,
    uri: 'http://localhost:3000/api/graphql', //https://graphqlhub.com/graphql
    fetch,
    cache
  });

  return client;
}