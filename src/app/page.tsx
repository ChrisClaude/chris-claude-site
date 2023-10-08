import {
  ArticlesBanner,
  Banner,
  GridBgWrapper,
  Newsletter,
  SocialMediaBanner,
  YouTubeChannelBanner
} from '@/components';

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
