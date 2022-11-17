import Link from 'next/link';
import styles from '../pages/index.module.css';

const PostCard = ({ post }: { post: any }) => {
  const date = new Date(post.last_edited_time).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <li key={post.id} className={styles.post}>
      <div className={styles.postHead}>
        <Link href={`/${post.id}`}>
          {post.cover && (
            <div className={styles.coverImg}>
              <img
                src={
                  post.cover.type === 'external'
                    ? post.cover.external.url
                    : post.cover.file.url
                }
                alt={post.properties.Name.title}
              />
            </div>
          )}
          <p>{date}</p>
          <div className={styles.postTitle}>
            {post.icon && (
              <span>
                {post.icon.type === 'emoji' ? (
                  post.icon.emoji
                ) : post.icon.type === 'external' ? (
                  <img
                    style={{ width: 50 }}
                    src={post.icon.external.url}
                    alt='icon'
                  />
                ) : (
                  <img
                    style={{ width: 50 }}
                    src={post.icon.file.url}
                    alt='icon'
                  />
                )}
              </span>
            )}
            <h3>{post.properties.Name.title[0]['plain_text']}</h3>
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
    </li>
  );
};

export default PostCard;
