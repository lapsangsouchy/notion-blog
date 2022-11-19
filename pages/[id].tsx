import { Fragment } from 'react';
import Head from 'next/head';
import { getDatabase, getPage, getBlocks } from '../lib/notion';
import Link from 'next/link';
import { databaseId } from './index';
import {
  Container,
  Title,
  Text,
  Overlay,
  createStyles,
  Code,
} from '@mantine/core';
import { Prism } from '@mantine/prism';

import styles from './post.module.css';

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

  code: {
    fontFamily: 'monospace',
    backgroundColor: theme.colorScheme === 'dark' ? 'lightgrey' : 'darkgrey',
    padding: '2px 4px',
    borderRadius: '2px',
    color: theme.colorScheme === 'dark' ? theme.black : theme.white,
  },
}));

export const TextBlock = ({ text }: { text: any }) => {
  const { classes } = useStyles();

  if (!text) {
    return null;
  }
  return text.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? styles.bold : '',
          code ? classes.code : '',
          italic ? styles.italic : '',
          strikethrough ? styles.strikethrough : '',
          underline ? styles.underline : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={value.id}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block: any) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map((block: any) => renderBlock(block))}</ol>;
  }
  return <ul>{value.children.map((block: any) => renderBlock(block))}</ul>;
};

const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <TextBlock text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <TextBlock text={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <TextBlock text={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <TextBlock text={value.rich_text} />
        </h3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <TextBlock text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type='checkbox' id={id} defaultChecked={value.checked} />{' '}
            <TextBlock text={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <TextBlock text={value.rich_text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      const codeCaption = value.caption ? value.caption[0]?.plain_text : '';
      // console.log(value);
      if (value.language === 'plain text') {
        return (
          <figure>
            <figcaption>&quot;raw&quot;</figcaption>
            <Code color='blue' block key={id}>
              {value.rich_text[0].plain_text}
            </Code>
            {codeCaption && <figcaption>{codeCaption}</figcaption>}
          </figure>
        );
      } else {
        // console.log(value.rich_text);
        return (
          <figure>
            <figcaption>{value.language}</figcaption>
            <Prism color='blue' language={value.language}>
              {value.rich_text.length > 0
                ? value.rich_text[0][value.rich_text[0].type].content
                : '// no code entered here'}
            </Prism>
            {codeCaption && <figcaption>{codeCaption}</figcaption>}
          </figure>
        );
      }

    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className={styles.file}>
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case 'bookmark':
      // console.log(block);
      // @TODO add in Puppetier function to create social card instead of just url
      const href = value.url;
      return (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.bookmark}
        >
          {href}
        </a>
      );
    default:
      // console.log(block);
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

export default function Post({ page, blocks }: { page: any; blocks: any }) {
  const { classes } = useStyles();
  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <article className={styles.container}>
        <div
          className={classes.wrapper}
          style={{
            backgroundImage: `url(${
              page.cover
                ? page.cover[page.cover.type].url
                : 'https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            })`,
          }}
        >
          <Overlay color='#000' opacity={0.65} zIndex={1} />
          <div className={classes.inner}>
            <Title className={classes.title}>
              {page.properties.Name.title[0]['plain_text']}
            </Title>
            <Container size={640}>
              <Text size='lg' className={classes.description}>
                {page.properties.Description.rich_text[0]['plain_text']}
              </Text>
            </Container>
          </div>
        </div>
        <section>
          {blocks.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href='/' className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database?.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
