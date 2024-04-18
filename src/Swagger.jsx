import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Swagger = () => {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "Timetable API",
      description: "API for managing schedule actions",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://node29.webte.fei.stuba.sk/davidov/timetableAPI/api.php",
      },
    ],
    paths: {
      "/timetable": {
        get: {
          summary: "Get all schedule actions",
          responses: {
            200: {
              description: "A list of schedule actions",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ScheduleAction",
                    },
                  },
                },
              },
            },
            404: {
              description: "No schedule actions found",
            },
          },
        },
        post: {
          summary: "Create a new schedule action",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NewScheduleAction",
                },
              },
            },
          },
          responses: {
            201: {
              description: "New schedule action created successfully",
            },
            500: {
              description: "Error creating new schedule action",
            },
          },
        },
      },
      "/timetable/{id}": {
        get: {
          summary: "Get a schedule action by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the schedule action to retrieve",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          responses: {
            200: {
              description: "A schedule action object",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ScheduleAction",
                  },
                },
              },
            },
            404: {
              description: "Schedule action not found",
            },
          },
        },
        put: {
          summary: "Update a schedule action",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the schedule action to update",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateScheduleAction",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Schedule action modified successfully",
            },
            404: {
              description: "Schedule action not found.",
            },
          },
        },
        delete: {
          summary: "Delete a schedule action",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the schedule action to delete",
              required: true,
              schema: {
                type: "integer",
                format: "int64",
              },
            },
          ],
          responses: {
            200: {
              description: "Schedule action deleted successfully",
            },
            404: {
              description: "Schedule action not found.",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ScheduleAction: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int64",
            },
            day: {
              type: "string",
            },
            start_time: {
              type: "string",
              format: "time",
            },
            end_time: {
              type: "string",
              format: "time",
            },
            course: {
              type: "string",
            },
            entry: {
              type: "string",
            },
            room: {
              type: "string",
            },
            teacher: {
              type: "string",
            },
            restriction: {
              type: "string",
            },
            capacity: {
              type: "integer",
              format: "int32",
            },
          },
        },
        NewScheduleAction: {
          type: "object",
          required: [
            "day",
            "start_time",
            "end_time",
            "course",
            "entry",
            "room",
            "teacher",
            "capacity",
          ],
          properties: {
            day: {
              type: "string",
            },
            start_time: {
              type: "string",
              format: "time",
            },
            end_time: {
              type: "string",
              format: "time",
            },
            course: {
              type: "string",
            },
            entry: {
              type: "string",
            },
            room: {
              type: "string",
            },
            teacher: {
              type: "string",
            },
            restriction: {
              type: "string",
            },
            capacity: {
              type: "integer",
              format: "int32",
            },
          },
        },
        UpdateScheduleAction: {
          type: "object",
          properties: {
            day: {
              type: "string",
            },
            start_time: {
              type: "string",
              format: "time",
            },
            end_time: {
              type: "string",
              format: "time",
            },
            course: {
              type: "string",
            },
            entry: {
              type: "string",
            },
            room: {
              type: "string",
            },
            teacher: {
              type: "string",
            },
            restriction: {
              type: "string",
            },
            capacity: {
              type: "integer",
              format: "int32",
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
