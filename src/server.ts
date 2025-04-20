import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as backlogjs from "backlog-js";
import { env } from "bun";

const backlog = new backlogjs.Backlog({
  host: env.BACKLOG_HOST,
  apiKey: env.BACKLOG_API_KEY,
});

const server = new McpServer({
  name: "Backlog MCP Server",
  version: "1.0.0",
});

server.tool("fetch-projects", {}, async () => {
  const projects = backlog.getProjects();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(projects),
      },
    ],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
