import Head from 'next/head';
import styles from './index.module.css';
import { getDatabase, getMeta } from '../lib/notion';
import PostCard from '../components/PostCard';
import {
  SimpleGrid,
  Container,
  Title,
  Text,
  Overlay,
  createStyles,
} from '@mantine/core';

export const databaseId: string = process.env.NOTION_BLOG_DATABASE_ID;

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,

    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },
}));

export default function Home({ posts, meta }: { posts: any; meta: any }) {
  const { classes } = useStyles();
  return (
    <div>
      <Head>
        <title>Social Asides</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header
        className={classes.wrapper}
        style={{ backgroundImage: `url(${meta.cover[meta.cover.type].url})` }}
      >
        <Overlay color='#000' opacity={0.65} zIndex={1} />
        <div className={classes.inner}>
          <Title className={classes.title}>{meta.title[0]['plain_text']}</Title>
          <Container size={640}>
            <Text size='lg' className={classes.description}>
              {meta.description[0]['plain_text']}
            </Text>
          </Container>
        </div>
      </header>
      <main className={styles.container}>
        <div className={styles.heading}>
          <h2>All Posts </h2>
        </div>

        <Container py='xl'>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        </Container>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  const dbMeta = await getMeta(databaseId);
  return {
    props: {
      posts: database,
      meta: dbMeta,
    },
    revalidate: 1,
  };
};
