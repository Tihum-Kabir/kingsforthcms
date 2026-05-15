const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

// =============================================
// AUTO-GENERATED OpenAPI 3.0 SPEC
// From Kingsforth Payload CMS Collections
// =============================================

const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Kingsforth Platform API',
    version: '1.0.0',
    description: 'Complete REST API for the Kingsforth Intelligence Platform. Built on Payload CMS with PostgreSQL.\n\n**Authentication:** Use `POST /api/users/login` to get a JWT token, then include it as `Authorization: JWT <token>` header.',
    contact: { name: 'Kingsforth Admin', email: 'admin@kingsforth.net' },
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local Development' }
  ],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Users', description: 'User management (COMMAND CENTER)' },
    { name: 'Services', description: 'Service catalog with pricing plans (CUSTOMIZE)' },
    { name: 'Solutions', description: 'Industry & use-case solutions (CUSTOMIZE)' },
    { name: 'Resources', description: 'Blog posts & case studies (CUSTOMIZE)' },
    { name: 'FAQs', description: 'Frequently asked questions (COMMAND CENTER)' },
    { name: 'Team Members', description: 'Team member profiles (COMMAND CENTER)' },
    { name: 'Companies', description: 'Client companies (COMMAND CENTER)' },
    { name: 'Subscriptions', description: 'Service subscriptions (COMMAND CENTER)' },
    { name: 'Invoices', description: 'Billing invoices (COMMAND CENTER)' },
    { name: 'Leads', description: 'Demo requests & leads (COMMAND CENTER)' },
    { name: 'Support Tickets', description: 'Customer support (OPERATIONS)' },
    { name: 'Media', description: 'Media library (CUSTOMIZE)' },
    { name: 'Partner Logos', description: 'Partner logo assets (CUSTOMIZE)' },
    { name: 'Product Features', description: 'Product feature showcase (CUSTOMIZE)' },
    { name: 'How It Works', description: 'Process steps (CUSTOMIZE)' },
    { name: 'Pages', description: 'CMS pages (CUSTOMIZE)' },
    { name: 'Knowledge Base', description: 'Help articles (INTELLIGENCE SUITE)' },
    { name: 'Analytics', description: 'Usage analytics (INTELLIGENCE SUITE)' },
    { name: 'Audit Logs', description: 'System audit trail (OPERATIONS)' },
    { name: 'Email Campaigns', description: 'Marketing campaigns' },
    { name: 'Globals', description: 'Site-wide settings & content' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Use the token from /api/users/login. Format: JWT <token>'
      }
    },
    schemas: {
      // ===== USER =====
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', format: 'email', example: 'admin@kingsforth.net' },
          name: { type: 'string', example: 'Admin User' },
          role: { type: 'string', enum: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'STAFF'], example: 'SUPER_ADMIN' },
          company: { type: 'integer', nullable: true, description: 'Company ID (relationship)' },
          avatar: { type: 'integer', nullable: true, description: 'Media ID (relationship)' },
          phone: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        }
      },
      UserCreate: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email', example: 'newuser@example.com' },
          password: { type: 'string', example: 'SecurePass123' },
          name: { type: 'string', example: 'John Doe' },
          role: { type: 'string', enum: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'STAFF'], default: 'STAFF' },
          company: { type: 'integer', nullable: true },
          phone: { type: 'string', nullable: true },
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'admin@kingsforth.net' },
          password: { type: 'string', example: 'Admin@123456' },
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Auth Passed' },
          user: { $ref: '#/components/schemas/User' },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiJ9...' },
          exp: { type: 'integer', example: 1712345678 },
        }
      },

      // ===== SERVICE =====
      Service: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          slug: { type: 'string', example: 'cognitive-surveillance' },
          title: { type: 'string', example: 'Cognitive Surveillance' },
          subtitle: { type: 'string', example: 'Real-time video analysis' },
          description: { type: 'object', description: 'Lexical rich text JSON' },
          icon: { type: 'string', example: 'eye' },
          category: { type: 'string', enum: ['surveillance', 'forensic', 'automation', 'iot', 'consulting', 'other'] },
          orderIndex: { type: 'integer', example: 1 },
          isPublished: { type: 'boolean' },
          features: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                icon: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
              }
            }
          },
          plans: {
            type: 'array',
            description: 'Pricing tiers (Plus, Pro, Enterprise, etc.)',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Pro' },
                price: { type: 'number', example: 299 },
                billingPeriod: { type: 'string', enum: ['MONTHLY', 'ANNUAL'] },
                description: { type: 'string' },
                planFeatures: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: { feature: { type: 'string', example: 'Unlimited cameras' } }
                  }
                }
              }
            }
          },
          heroImage: { type: 'integer', nullable: true, description: 'Media ID' },
          metaTitle: { type: 'string', nullable: true },
          metaDescription: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        }
      },
      ServiceCreate: {
        type: 'object',
        required: ['slug', 'title'],
        properties: {
          slug: { type: 'string', example: 'new-service' },
          title: { type: 'string', example: 'New Service' },
          subtitle: { type: 'string' },
          category: { type: 'string', enum: ['surveillance', 'forensic', 'automation', 'iot', 'consulting', 'other'] },
          icon: { type: 'string', example: 'shield' },
          orderIndex: { type: 'integer', example: 7 },
          isPublished: { type: 'boolean', default: false },
          features: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                icon: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
              }
            }
          },
          plans: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name', 'price', 'billingPeriod'],
              properties: {
                name: { type: 'string', example: 'Enterprise' },
                price: { type: 'number', example: 999 },
                billingPeriod: { type: 'string', enum: ['MONTHLY', 'ANNUAL'] },
                description: { type: 'string', example: 'For large teams' },
                planFeatures: {
                  type: 'array',
                  items: { type: 'object', properties: { feature: { type: 'string' } } }
                }
              }
            }
          }
        }
      },

      // ===== SOLUTION =====
      Solution: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          slug: { type: 'string', example: 'education' },
          title: { type: 'string', example: 'Education' },
          subtitle: { type: 'string' },
          category: { type: 'string', enum: ['Industry', 'Use Case'] },
          description: { type: 'object', description: 'Rich text' },
          isPublished: { type: 'boolean' },
          heroImage: { type: 'integer', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        }
      },

      // ===== FAQ =====
      FAQ: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          question: { type: 'string', example: 'What is Kingsforth?' },
          answer: { type: 'string', example: 'An advanced intelligence platform.' },
          category: { type: 'string' },
          sortOrder: { type: 'integer' },
        }
      },

      // ===== TEAM MEMBER =====
      TeamMember: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', example: 'Asif Mahbub' },
          role: { type: 'string', example: 'Co-Founder & CEO' },
          bio: { type: 'string' },
          photo: { type: 'integer', nullable: true },
          sortOrder: { type: 'integer' },
        }
      },

      // ===== COMPANY =====
      Company: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', example: 'Acme Corp' },
          industry: { type: 'string' },
          address: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        }
      },

      // ===== LEAD =====
      Lead: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', example: 'Jane Smith' },
          email: { type: 'string', format: 'email' },
          company: { type: 'string' },
          phone: { type: 'string' },
          message: { type: 'string' },
          source: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        }
      },

      // ===== SUPPORT TICKET =====
      SupportTicket: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'] },
          company: { type: 'integer' },
          user: { type: 'integer' },
          assignedTo: { type: 'integer', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        }
      },

      // ===== SUBSCRIPTION =====
      Subscription: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          company: { type: 'integer' },
          service: { type: 'integer' },
          status: { type: 'string', enum: ['ACTIVE', 'CANCELLED', 'TRIAL'] },
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date', nullable: true },
          usersAllowed: { type: 'integer', default: 5 },
          customPrice: { type: 'number', nullable: true },
        }
      },

      // ===== INVOICE =====
      Invoice: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          subscription: { type: 'integer' },
          amount: { type: 'number' },
          status: { type: 'string', enum: ['DRAFT', 'SENT', 'PAID', 'OVERDUE'] },
          billingPeriodStart: { type: 'string', format: 'date' },
          billingPeriodEnd: { type: 'string', format: 'date' },
          currency: { type: 'string', default: 'USD' },
        }
      },

      // ===== SITE SETTINGS (Global) =====
      SiteSettings: {
        type: 'object',
        properties: {
          siteName: { type: 'string', example: 'Kingsforth' },
          siteTagline: { type: 'string', example: 'Enterprise Intelligence Systems' },
          siteLogo: { type: 'integer', nullable: true, description: 'Media ID' },
          socialLinks: {
            type: 'object',
            properties: {
              facebook: { type: 'string' },
              instagram: { type: 'string' },
              twitter: { type: 'string' },
              linkedin: { type: 'string' },
              youtube: { type: 'string' },
            }
          },
          partnerLogosEnabled: { type: 'boolean' },
          teamSectionHeading: { type: 'string' },
          aboutSectionHeading: { type: 'string' },
          emailFromName: { type: 'string' },
          emailFromAddress: { type: 'string', format: 'email' },
        }
      },

      // ===== GENERIC RESPONSES =====
      PaginatedResponse: {
        type: 'object',
        properties: {
          docs: { type: 'array', items: {} },
          totalDocs: { type: 'integer' },
          limit: { type: 'integer' },
          totalPages: { type: 'integer' },
          page: { type: 'integer' },
          pagingCounter: { type: 'integer' },
          hasPrevPage: { type: 'boolean' },
          hasNextPage: { type: 'boolean' },
          prevPage: { type: 'integer', nullable: true },
          nextPage: { type: 'integer', nullable: true },
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                name: { type: 'string' },
              }
            }
          }
        }
      }
    }
  },
  paths: {}
};

// =============================================
// HELPER: Generate CRUD paths for a collection
// =============================================
function addCollectionPaths(slug, tag, schemaName, createSchemaName, options = {}) {
  const { publicRead = false, publicCreate = false } = options;

  // LIST
  openApiSpec.paths[`/api/${slug}`] = {
    get: {
      tags: [tag],
      summary: `List ${tag}`,
      operationId: `list${schemaName}`,
      security: publicRead ? [] : [{ bearerAuth: [] }],
      parameters: [
        { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
        { name: 'sort', in: 'query', schema: { type: 'string' }, description: 'Field to sort by. Prefix with - for descending' },
        { name: 'depth', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Relationship population depth' },
      ],
      responses: {
        200: { description: 'Success', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedResponse' } } } },
        401: { description: 'Unauthorized' },
      }
    },
    post: {
      tags: [tag],
      summary: `Create ${tag.replace(/s$/, '')}`,
      operationId: `create${schemaName}`,
      security: publicCreate ? [] : [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: `#/components/schemas/${createSchemaName || schemaName}` } } }
      },
      responses: {
        201: { description: 'Created', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, doc: { $ref: `#/components/schemas/${schemaName}` } } } } } },
        400: { description: 'Validation Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        401: { description: 'Unauthorized' },
      }
    }
  };

  // GET / PATCH / DELETE by ID
  openApiSpec.paths[`/api/${slug}/{id}`] = {
    get: {
      tags: [tag],
      summary: `Get ${tag.replace(/s$/, '')} by ID`,
      operationId: `get${schemaName}ById`,
      security: publicRead ? [] : [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        { name: 'depth', in: 'query', schema: { type: 'integer', default: 1 } },
      ],
      responses: {
        200: { description: 'Success', content: { 'application/json': { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
        404: { description: 'Not Found' },
      }
    },
    patch: {
      tags: [tag],
      summary: `Update ${tag.replace(/s$/, '')}`,
      operationId: `update${schemaName}`,
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: `#/components/schemas/${createSchemaName || schemaName}` } } }
      },
      responses: {
        200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, doc: { $ref: `#/components/schemas/${schemaName}` } } } } } },
        400: { description: 'Validation Error' },
        401: { description: 'Unauthorized' },
      }
    },
    delete: {
      tags: [tag],
      summary: `Delete ${tag.replace(/s$/, '')}`,
      operationId: `delete${schemaName}`,
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: {
        200: { description: 'Deleted' },
        401: { description: 'Unauthorized' },
        404: { description: 'Not Found' },
      }
    }
  };
}

// =============================================
// AUTH PATHS
// =============================================
openApiSpec.paths['/api/users/login'] = {
  post: {
    tags: ['Auth'],
    summary: 'Login',
    operationId: 'login',
    requestBody: {
      required: true,
      content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } }
    },
    responses: {
      200: { description: 'Success', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
      401: { description: 'Invalid credentials' },
    }
  }
};

openApiSpec.paths['/api/users/logout'] = {
  post: {
    tags: ['Auth'],
    summary: 'Logout',
    operationId: 'logout',
    security: [{ bearerAuth: [] }],
    responses: { 200: { description: 'Logged out' } }
  }
};

openApiSpec.paths['/api/users/me'] = {
  get: {
    tags: ['Auth'],
    summary: 'Get Current User',
    operationId: 'getCurrentUser',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'Success', content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } } },
      401: { description: 'Not authenticated' },
    }
  }
};

openApiSpec.paths['/api/users/refresh-token'] = {
  post: {
    tags: ['Auth'],
    summary: 'Refresh Token',
    operationId: 'refreshToken',
    security: [{ bearerAuth: [] }],
    responses: { 200: { description: 'New token', content: { 'application/json': { schema: { type: 'object', properties: { refreshedToken: { type: 'string' } } } } } } }
  }
};

// =============================================
// GENERATE ALL COLLECTION PATHS
// =============================================
addCollectionPaths('users', 'Users', 'User', 'UserCreate', { publicCreate: true });
addCollectionPaths('services', 'Services', 'Service', 'ServiceCreate', { publicRead: true });
addCollectionPaths('solutions', 'Solutions', 'Solution', null, { publicRead: true });
addCollectionPaths('resources', 'Resources', 'Solution', null, { publicRead: true });
addCollectionPaths('faqs', 'FAQs', 'FAQ', null, { publicRead: true });
addCollectionPaths('team-members', 'Team Members', 'TeamMember', null, { publicRead: true });
addCollectionPaths('companies', 'Companies', 'Company');
addCollectionPaths('subscriptions', 'Subscriptions', 'Subscription');
addCollectionPaths('invoices', 'Invoices', 'Invoice');
addCollectionPaths('leads', 'Leads', 'Lead', null, { publicCreate: true });
addCollectionPaths('support-tickets', 'Support Tickets', 'SupportTicket');
addCollectionPaths('media', 'Media', 'Lead');
addCollectionPaths('partner-logos', 'Partner Logos', 'Lead', null, { publicRead: true });
addCollectionPaths('product-features', 'Product Features', 'Lead', null, { publicRead: true });
addCollectionPaths('how-it-works-steps', 'How It Works', 'Lead', null, { publicRead: true });
addCollectionPaths('pages', 'Pages', 'Lead', null, { publicRead: true });
addCollectionPaths('knowledge-base', 'Knowledge Base', 'Lead', null, { publicRead: true });
addCollectionPaths('analytics', 'Analytics', 'Lead');
addCollectionPaths('audit-logs', 'Audit Logs', 'Lead');
addCollectionPaths('email-campaigns', 'Email Campaigns', 'Lead');

// GLOBALS
openApiSpec.paths['/api/globals/site-settings'] = {
  get: {
    tags: ['Globals'],
    summary: 'Get Site Settings',
    operationId: 'getSiteSettings',
    responses: { 200: { description: 'Success', content: { 'application/json': { schema: { $ref: '#/components/schemas/SiteSettings' } } } } }
  },
  post: {
    tags: ['Globals'],
    summary: 'Update Site Settings (SUPER_ADMIN only)',
    operationId: 'updateSiteSettings',
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: { 'application/json': { schema: { $ref: '#/components/schemas/SiteSettings' } } }
    },
    responses: { 200: { description: 'Updated' }, 401: { description: 'Unauthorized' } }
  }
};

openApiSpec.paths['/api/globals/about-content'] = {
  get: {
    tags: ['Globals'],
    summary: 'Get About Content',
    operationId: 'getAboutContent',
    responses: { 200: { description: 'Success' } }
  },
  post: {
    tags: ['Globals'],
    summary: 'Update About Content (SUPER_ADMIN only)',
    operationId: 'updateAboutContent',
    security: [{ bearerAuth: [] }],
    requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
    responses: { 200: { description: 'Updated' } }
  }
};

// =============================================
// START SWAGGER UI SERVER
// =============================================
const app = express();
app.use(cors());

const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar { background-color: #0a0f1c; }
    .swagger-ui .topbar .wrapper { max-width: 1200px; }
    body { background-color: #fafafa; }
  `,
  customSiteTitle: 'Kingsforth API Docs',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
  }
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, swaggerOptions));

// Serve raw OpenAPI JSON
app.get('/openapi.json', (req, res) => {
  res.json(openApiSpec);
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/docs');
});

const PORT = 8005;
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║   🚀 Kingsforth API Documentation Server           ║');
  console.log('║                                                      ║');
  console.log('║   Swagger UI:    http://localhost:8005/docs           ║');
  console.log('║   OpenAPI JSON:  http://localhost:8005/openapi.json   ║');
  console.log('║                                                      ║');
  console.log('║   API Server:    http://localhost:3000/api            ║');
  console.log('║   Admin Panel:   http://localhost:3000/admin          ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});
