import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from './styles.module.scss';
import HabitList from '../components/HabitList';
import HabitForm from '../components/HabitForm';

function Home() {

  return (
    <Layout>
      <div className="hero">
        <h1 className={styles.title}>Level Up Your Life</h1>
        <div className={styles.list}>
          <HabitForm />
          <HabitList />
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
      `}</style>

      <style jsx global>{`
        *,
        *::after,
        *::before {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 10px;
        }

        body {
          font-size: 1.6rem;
        }

        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </Layout>
  )
}

export default withApollo(Home);