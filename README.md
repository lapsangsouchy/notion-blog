# Social Asides With Notion and Next.js

This is my ongoing project to fully build a blog or website with [Next.js](https://nextjs.org/) and [Notion API](https://developers.notion.com/) as a JAMStack application. Styled with [Mantine](https://mantine.dev/) and CSS Modules

## Demo

https://social-notion-blog.vercel.app/

If you'd like more of an explanation of how everything works, check the ["Explaining All This"](https://social-notion-blog.vercel.app/521021f4-fef2-45d2-86a5-4ad8d8ee2e9d) page

For a list of what's to come I've also included a [@TODO Post](https://social-notion-blog.vercel.app/d24d1388-fe2a-4196-9aa3-32545fc917bd) that I'll be updating as well

## Run Locally

Clone the project

```bash
  git clone https://github.com/lapsangsouchy/notion-blog.git
```

Install dependencies

```bash
  npm install
```

### Environment Variables

Then you'll want to create an `.env.local` in the root directory and add your `NOTION_ACCESS_TOKEN` and `NOTION_BLOG_DATABASE_ID` variables.

[Here's the official Notion API Documentation for getting these variables as well as setting up a basic database](https://developers.notion.com/docs/create-a-notion-integration)

Once you've created your database, connected the integration, and added your environment variables, start the server

```bash
  npm run dev
```

## Feedback

I'm trying to implement as many features as possible from scratch for learning purposes.

If you want a primo Notion API Renderer, I can't stress how amazing [react-notion-x](https://github.com/NotionX/react-notion-x) is.

If you have any feedback, please reach out to to me at aleesmithnyc@gmail.com or feel free to contribute!
