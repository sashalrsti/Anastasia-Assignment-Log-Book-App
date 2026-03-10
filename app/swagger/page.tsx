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
          200: { description: "Success" }
        }
      },
      post: {
        summary: "Create new assignment",
        responses: {
          200: { description: "Created" }
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
          200: { description: "Success" },
          404: { description: "Not found" }
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
        responses: {
          200: { description: "Assignment updated" },
          404: { description: "Assignment not found" }
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
          200: { description: "Assignment deleted" },
          404: { description: "Assignment not found" }
        }
      }
    }
  }
}

export default function SwaggerPage() {
  return <SwaggerUI spec={spec} />
}