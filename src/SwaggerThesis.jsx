import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Swagger = () => {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "Thesis API",
      description: "API for managing thesis topics",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://node29.webte.fei.stuba.sk/davidov/thesisAPI/api.php",
      },
    ],
    paths: {
      "/thesis": {
        post: {
          summary: "Get free thesis topics",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    pracoviste: {
                      type: "integer",
                      description: "ID of the workplace",
                    },
                    type: {
                      type: "string",
                      description: "Type of thesis topic",
                    },
                    supervisor: {
                      type: "string",
                      description: "Name of the supervisor",
                    },
                    program: {
                      type: "string",
                      description: "Study program",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "List of free thesis topics",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ThesisTopic",
                    },
                  },
                },
              },
            },
            400: {
              description: "Missing parameter",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ThesisTopic: {
          type: "object",
          properties: {
            topicName: {
              type: "string",
              description: "Name of the thesis topic",
            },
            supervisor: {
              type: "string",
              description: "Name of the supervisor",
            },
            institute: {
              type: "string",
              description: "Name of the institute",
            },
            program: {
              type: "string",
              description: "Study program",
            },
            focus: {
              type: "string",
              description: "Focus of the thesis topic",
            },
            abstract: {
              type: "string",
              description: "Abstract of the thesis topic",
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <SwaggerUI spec={spec} />
    </div>
  );
};

export default Swagger;
