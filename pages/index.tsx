import Head from 'next/head';
import styles from '../styles/index.module.css';
import { getDatabase, getMeta } from '../lib/notion';
import PostCard from '../components/PostCard';

import {
  SimpleGrid,
  Container,
  Title,
  Text,
  Overlay,
  Group,
  Button,
  createStyles,
  Image,
} from '@mantine/core';

export const databaseId: string = process.env.NOTION_BLOG_DATABASE_ID;

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
      marginBottom: '2rem',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      order: 2,
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
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

      {/* <header
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
      </header> */}

      <Container>
        <div className={classes.inner}>
          <Container size={500} className={classes.image}>
            <Image
              radius='md'
              alt='Alex Smith Headshot'
              src='/me.jpg'
              height={500}
            />
          </Container>
          <div className={classes.content}>
            <Title className={classes.title}>
              {meta.title[0]['plain_text']}
            </Title>
            <Title order={2} color='dimmed' mt='md'>
              {meta.description[0]['plain_text']}
            </Title>
          </div>
        </div>
      </Container>

      <main className={styles.container}>
        <div className={styles.heading}>
          <h2>Projects</h2>
        </div>

        <Group py='lg'>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        </Group>
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
