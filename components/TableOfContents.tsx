import { Text, Box, Group, createStyles } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { IconListSearch } from '@tabler/icons';

// Styles
const useStyles = createStyles((theme) => ({
  toc: {
    position: 'fixed',
    right: '3em',
    top: '5em',
    padding: '1em',
    width: '14em',
    zIndex: 1,

    [`@media (max-width: 1175px)`]: {
      display: 'none',
    },
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: 1.2,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 6 : 7],
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 2 : 7],

    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}));

// IntersectObserver Hook
const useIntersectionObserver = (setActive: any) => {
  const headingElementsRef = useRef<any>({});
  useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce(
        (map: any, headingElement: any) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );
      // console.log(headingElementsRef);

      const visibleHeadings: any[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        // console.log(headingElement);
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading: any) => heading.id === id);

      // console.log(visibleHeadings);

      if (visibleHeadings.length === 1) {
        // console.log(visibleHeadings[0].target.id);
        setActive(`#${visibleHeadings[0].target.id}`);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        // console.log(sortedVisibleHeadings[0].target.id);
        setActive(`#${sortedVisibleHeadings[0].target.id}`);
      }
    };
    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    });

    const section = document?.querySelector('section') as HTMLElement;
    const headingElements = Array.from(section.querySelectorAll('h1, h2, h3'));
    // console.log(headingElements);
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActive]);
};

export default function TableOfContents({
  links,
}: {
  links: { label: string; link: string; order: number }[];
}): JSX.Element {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState();
  useIntersectionObserver(setActive);

  const items = links.map((item: any) => (
    <Box<'a'>
      component='a'
      href={item.link}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(item.link)?.scrollIntoView({
          behavior: 'smooth',
        });
        setActive(item.link);
      }}
      key={item.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === item.link,
      })}
      sx={(theme) => ({ paddingLeft: item.order * theme.spacing.md })}
    >
      {item.label}
    </Box>
  ));

  return (
    <div className={classes.toc}>
      <Group mb='md'>
        <IconListSearch size={18} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      {items}
    </div>
  );
}
