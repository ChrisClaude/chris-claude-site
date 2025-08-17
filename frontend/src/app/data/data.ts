import { Article as ArticleType } from '../AppTypes';

{
  /* TODO: This should come from a directory with files (.md files) that we can parse and loop through */
}
export const articles: ArticleType[] = [
  {
    id: '1',
    src: '/Logging_in_ASP_NET_Thumbnail.png',
    alt: 'Logging in asp.net thumbnail',
    description:
      'How to log different types of information and use logging providers available in .NET Core',
  },
  {
    id: '2',
    src: '/Exception_handling_in_ASP_NET Thumbnail.png',
    alt: 'Exception handling in asp.net thumbnail',
    description:
      'Best practices on how to handle errors and exceptions in ASP.NET Core',
  },
  {
    id: '3',
    src: '/ASP_NET_Web_API_Authentication_with_Identity_Server_6_Thumbnail.png',
    alt: 'ASP.NET API Authentication with Identity Server',
    description:
      'Leverage the OAuth2 and OpenId protocols to secure your Web API',
  },
];
