import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import { getDatabase } from '../lib/notion';
import PostCard from '../components/PostCard';
import { SimpleGrid, Container } from '@mantine/core';
import { TextBlock } from './[id]';

export const databaseId: string = process.env.NOTION_BLOG_DATABASE_ID;

export default function Home({ posts }: { posts: any }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Notion Blog Project</h1>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
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

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
