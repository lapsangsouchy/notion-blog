/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '../styles/index.module.css';
import {
  createStyles,
  Card,
  Image,
  Text,
  AspectRatio,
  ActionIcon,
} from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  tag: {
    opacity: 1,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.grape[9]
        : theme.colors.grape[2],
    margin: '5px',
    padding: '5px',
    borderRadius: '5px',
    fontSize: '15px',
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: theme.shadows.md,
    },
  },
  link: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    background: 'none',
    border: 'none',

    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: theme.shadows.md,
    },
  },
}));

const PostCard = ({ post }: { post: any }) => {
  const { classes } = useStyles();

  const date = new Date(post.created_time).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <Card key={post.id} p='md' radius='md' className={classes.card}>
      <div className={styles.postHead}>
        <a href={post.properties.Live.url} target='_blank' rel='noreferrer'>
          {post.cover && (
            <AspectRatio ratio={1920 / 1080}>
              <img
                src={
                  post.cover.type === 'external'
                    ? post.cover.external.url
                    : post.cover.file.url
                }
                alt={post.properties.Name.title}
              />
            </AspectRatio>
          )}
          <Text
            color='dimmed'
            size='xs'
            transform='uppercase'
            weight={700}
            mt='md'
          >
            {date}
          </Text>
          <div className={styles.postTitle}>
            {post.icon && (
              <span style={{ marginRight: '3px' }}>
                {post.icon.type === 'emoji' ? (
                  post.icon.emoji
                ) : (
                  <Image
                    style={{ width: 30 }}
                    src={post.icon[post.icon.type].url}
                    alt='icon'
                  />
                )}
              </span>
            )}
            <Text className={classes.title} mt={5}>
              {post.properties.Name.title[0]
                ? post.properties.Name.title[0]['plain_text']
                : '[Title]'}
            </Text>
          </div>
        </a>
      </div>
      <div className={styles.postDescription}>
        <p>
          {post.properties.Description.rich_text[0]
            ? post.properties.Description.rich_text[0]['plain_text']
            : '[Description]'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {post.properties.Tags['multi_select'].map((tag: any) => (
            <p className={classes.tag} key={tag.id}>
              {tag.name}{' '}
            </p>
          ))}
        </div>
      </div>
      <div>
        <ActionIcon
          component='a'
          href={post.properties.Repo.url}
          target='_blank'
          rel='noopener noreferrer'
          size='lg'
          className={classes.link}
        >
          <IconBrandGithub size={25} stroke={1.5} />
        </ActionIcon>
        <a
          href={post.properties.Live.url}
          target='_blank'
          rel='noopener noreferrer'
          className={classes.link}
        >
          <button className={classes.link}>View Live</button>
        </a>
      </div>
      <Link className={classes.link} href={`/${post.id}`}>
        <button className={classes.link}>Read About It →</button>
      </Link>
    </Card>
  );
};

export default PostCard;
