import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import { createClient } from '../../shared/apollo';

class MyApp extends App {
  getChildren() {
    const { Component, pageProps } = this.props;

    if (process.browser) {
      const apolloClient = createClient();

      return (
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      );
    } else {
      return <Component {...pageProps} />;
    }
  }
  render() {
    return (
      <Container>
        {this.getChildren()}
      </Container>
    );
  }
}

export default MyApp;
