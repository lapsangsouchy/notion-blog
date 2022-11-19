import { useState } from 'react';
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons';
import { IconSun, IconMoonStars } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export default function Layout({ links }: HeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={56}>
      <Container className={classes.inner}>
        <Burger
          opened={opened}
          onClick={toggle}
          size='sm'
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          <ActionIcon
            component='a'
            href='https://www.linkedin.com/in/alexander-smith-bklyn/'
            target='_blank'
            rel='noopener noreferrer'
            size='lg'
          >
            <IconBrandLinkedin size={25} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component='a'
            href='https://github.com/lapsangsouchy'
            target='_blank'
            rel='noopener noreferrer'
            size='lg'
          >
            <IconBrandGithub size={25} stroke={1.5} />
          </ActionIcon>
        </Group>

        <Link href='/' className={classes.link}>
          <h1>Social Asides</h1>
        </Link>

        <Group spacing={0} className={classes.social} position='right' noWrap>
          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}
