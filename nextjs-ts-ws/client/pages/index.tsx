
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

const SUB = gql`
  subscription {
    ping
  }
`;

const Index: React.SFC = () => {
  if (!process.browser) {
    return <h1>hi server</h1>;
  }

  return (
    <Subscription
      variables={{}}
      subscription={SUB}
    >
      {({ data }) => (
        <h4>Hi: {data && data.ping}</h4>
      )}
    </Subscription>
  )
};

export default Index;
