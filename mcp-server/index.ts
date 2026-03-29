#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read data from our Next.js data file to serve via MCP
// In a real scenario, this would connect to the Supabase database.
const getMockData = async () => {
  try {
     const dataPath = path.resolve(__dirname, "../src/lib/data.ts");
     const content = await fs.readFile(dataPath, "utf-8");
     return content;
  } catch (err) {
     return "Data not found or could not be read.";
  }
};

const server = new Server(
  {
    name: "digital-orchard-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_market_prices",
        description: "Get the current wholesale and retail prices of mangoes in Bangladesh.",
        inputSchema: {
          type: "object",
          properties: {
            variety: {
              type: "string",
              description: "The variety of mango (e.g., Langra, Himsagar, Fazli). If left empty, returns all prices.",
            },
          },
        },
      },
      {
        name: "get_orchard_stock",
        description: "Check the current product stock available for a specific region.",
        inputSchema: {
          type: "object",
          properties: {
            region: {
              type: "string",
              description: "The region to check (e.g., Rajshahi, Dinajpur).",
            },
          },
          required: ["region"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_market_prices") {
    const variety = args?.variety as string | undefined;
    
    // Hardcoded mock response for the MCP that an AI agent could use
    let result = "Current Mango Prices:\n\n";
    if (variety && variety.toLowerCase() === "langra") {
      result += "- Premium Rajshahi Langra: ৳120/kg\n";
    } else if (variety && variety.toLowerCase() === "himsagar") {
      result += "- Chapainawabganj Himsagar: ৳130/kg\n";
    } else {
      result += "- Premium Rajshahi Langra: ৳120/kg\n";
      result += "- Chapainawabganj Himsagar: ৳130/kg\n";
      result += "- Dinajpur Fazli: ৳100/kg\n";
      result += "- Amrupali: ৳150/kg\n";
    }
    
    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  }

  if (name === "get_orchard_stock") {
    const region = args?.region as string;
    if (!region) {
      throw new Error("Region is required");
    }

    if (region.toLowerCase() === "rajshahi") {
       return {
         content: [{ type: "text", text: `Stock for ${region}: 950 kg total (Langra: 500kg, Amrupali: 450kg). Ready for dispatch.` }]
       };
    } else if (region.toLowerCase() === "dinajpur") {
       return {
         content: [{ type: "text", text: `Stock for ${region}: 200 kg total (Fazli: 200kg). Next harvest in 3 days.` }]
       };
    }
    
    return {
       content: [{ type: "text", text: `Stock for ${region}: Currently OUT OF STOCK or undefined region.` }]
    };
  }

  throw new Error(`Tool not found: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Digital Orchard MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP server:", error);
  process.exit(1);
});
