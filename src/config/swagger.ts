import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const port = process.env.PORT || 3000;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript MySQL API',
      version: '1.0.0',
      description: 'Template starter Express.js dengan TypeScript, MySQL (Sequelize), dan dokumentasi Swagger OpenAPI 3.0.',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development Server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            role: {
              type: 'string',
              example: 'user',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-10-21T07:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-10-21T07:00:00.000Z',
            },
          },
        },
        CreateUserInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: {
              type: 'string',
              example: 'Jane Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'jane@example.com',
            },
            role: {
              type: 'string',
              default: 'user',
              example: 'user',
            },
          },
        },
        UpdateUserInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Jane Doe Updated',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'jane.updated@example.com',
            },
            role: {
              type: 'string',
              example: 'admin',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operasi berhasil',
            },
            data: {
              type: 'object',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Terjadi kesalahan pada server',
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../routes/*.js'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
