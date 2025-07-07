import {
  ArticlesBanner,
  Banner,
  Box,
  GridBgWrapper,
  Newsletter,
  SocialMediaBanner,
  YouTubeChannelBanner,
} from '@/components';

const Home = () => (
  <>
    <Banner />
    <GridBgWrapper>
      <Box>
        <ArticlesBanner />
        <YouTubeChannelBanner />
        <SocialMediaBanner />
      </Box>
    </GridBgWrapper>
    <Newsletter />
  </>
);

export default Home;
