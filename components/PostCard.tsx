import Link from 'next/link';
import styles from '../pages/index.module.css';
import { createStyles, Card, Image, Text, AspectRatio } from '@mantine/core';

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
}));

const PostCard = ({ post }: { post: any }) => {
  const { classes } = useStyles();

  const date = new Date(post.last_edited_time).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <Card key={post.id} p='md' radius='md' className={classes.card}>
      <div className={styles.postHead}>
        <Link href={`/${post.id}`}>
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
              <span>
                {post.icon.type === 'emoji' ? (
                  post.icon.emoji
                ) : (
                  <Image
                    style={{ width: 50 }}
                    src={post.icon[post.icon.type].url}
                    alt='icon'
                  />
                )}
              </span>
            )}
            <Text className={classes.title} mt={5}>
              {post.properties.Name.title[0]['plain_text']}
            </Text>
          </div>
        </Link>
      </div>
      <div className={styles.postDescription}>
        <p>{post.properties.Description.rich_text[0]['plain_text']}</p>
        <p>
          {post.properties.Tags['multi_select'].map((tag: any) => (
            <span
              className={styles.tag}
              key={tag.id}
              style={
                tag.color !== 'default'
                  ? { backgroundColor: tag.color }
                  : { backgroundColor: 'green' }
              }
            >
              #{tag.name}{' '}
            </span>
          ))}
        </p>
      </div>

      <Link href={`/${post.id}`}>Read post →</Link>
    </Card>
  );
};

export default PostCard;
