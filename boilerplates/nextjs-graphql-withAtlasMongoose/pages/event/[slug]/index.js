import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';

const Slug = () => {

  const router = useRouter();
  console.log(router.query)

  return (
    <Layout>
      <h1>Slug</h1>
    </Layout>
  )
}

export default Slug;