import { NextSeo } from 'next-seo'
import { SEO } from '@/utils/constants/seo'
import Wrapper from '@/layouts/Wrapper'
import Listening from '@/layouts/Listening'

const ListeningPage = () => (
  <>
    <NextSeo
      title="ouvindo | twobanks"
      {...SEO}
    />
    <Wrapper page="ouvindo">
      <Listening />
    </Wrapper>
  </>
)

export default ListeningPage
