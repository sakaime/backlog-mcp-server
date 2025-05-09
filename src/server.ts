import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as backlogjs from "backlog-js";
import { env } from "bun";
import { z } from "zod";

const backlog = new backlogjs.Backlog({
  host: env.BACKLOG_HOST,
  apiKey: env.BACKLOG_API_KEY,
});

const server = new McpServer({
  name: "Backlog MCP Server",
  version: "1.0.0",
});

server.tool("fetch-projects", {}, async () => {
  const projects = await backlog.getProjects();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(projects),
      },
    ],
  };
});

server.tool(
  "fetch-issues",
  {
    projectIds: z.array(z.number()).optional(),
  },
  async ({ projectIds }) => {
    const issues = await backlog.getIssues({
      projectId: projectIds,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(issues),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
