"use client"

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const spec = {
  openapi: "3.0.0",
  info: {
    title: "Sasha Assignment Log Book API",
    version: "1.0.0"
  },

  paths: {

    "/api/assignments": {

      get: {
        summary: "Get all assignments",
        responses: {
          200: {
            description: "List of assignments"
          }
        }
      },

      post: {
        summary: "Create new assignment",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Database Assignment"
                  },
                  description: {
                    type: "string",
                    example: "Create ER Diagram"
                  },
                  status: {
                    type: "string",
                    enum: ["Create", "On Process", "Submitted"]
                  },
                  dueDate: {
                    type: "string",
                    format: "date",
                    example: "2026-03-20"
                  }
                },
                required: ["title", "description", "dueDate"]
              }
            }
          }
        },

        responses: {
          200: {
            description: "Assignment created successfully"
          },
          400: {
            description: "Missing required fields"
          }
        }
      }
    },


    "/api/assignments/{id}": {

      get: {
        summary: "Get assignment detail",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],

        responses: {
          200: {
            description: "Assignment found"
          },
          404: {
            description: "Assignment not found"
          }
        }
      },


      put: {
        summary: "Update assignment",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string"
                  },
                  description: {
                    type: "string"
                  },
                  status: {
                    type: "string",
                    enum: ["Create", "On Process", "Submitted"]
                  },
                  dueDate: {
                    type: "string",
                    format: "date"
                  }
                }
              }
            }
          }
        },

        responses: {
          200: {
            description: "Assignment updated"
          },
          404: {
            description: "Assignment not found"
          }
        }
      },


      delete: {
        summary: "Delete assignment",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],

        responses: {
          200: {
            description: "Assignment deleted"
          },
          404: {
            description: "Assignment not found"
          }
        }
      }
    }
  }
}

export default function SwaggerPage() {
  return <SwaggerUI spec={spec} />
}