import ArticlesBanner from '@/components/ArticlesBanner';
import Banner from '@/components/Banner';
import YouTubeChannelBanner from '@/components/YouTubeChannelBanner';
import SocialMediaBanner from '@/components/SocialMediaBanner';
import GridBgWrapper from '@/components/GridBgWrapper';
import Newsletter from './components/Newsletter';

const Home = () => (
  <>
    <Banner />
    <GridBgWrapper>
      <ArticlesBanner />
      <YouTubeChannelBanner />
      <SocialMediaBanner />
    </GridBgWrapper>
    <Newsletter />
  </>
);

export default Home;
