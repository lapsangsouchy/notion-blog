import {
  Client,
  isNotionClientError,
  LogLevel,
  APIErrorCode,
  ClientErrorCode,
} from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  // logLevel: LogLevel.DEBUG,
});

export const getMeta = async (databaseId: string) => {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    // console.log(response);
    return response;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.log(error);
          break;
        case APIErrorCode.ObjectNotFound:
          console.log(error);
          break;
        case APIErrorCode.Unauthorized:
          console.log(error);
          break;
      }
    }
  }
};

export const getDatabase = async (databaseId: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });
    // console.log(response);
    return response.results;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.log(error);
          break;
        case APIErrorCode.ObjectNotFound:
          console.log(error);
          break;
        case APIErrorCode.Unauthorized:
          console.log(error);
          break;
      }
    }
  }
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response.properties);
  return response;
};

export const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor: string | undefined;
  while (true) {
    const {
      results,
      next_cursor,
    }: { results: any; next_cursor: string | null } =
      await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};
