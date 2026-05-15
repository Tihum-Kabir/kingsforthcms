import { NextResponse } from 'next/server';

function buildSpec() {
  const spec: any = {
    openapi: '3.0.3',
    info: {
      title: 'Kingsforth Platform API',
      version: '1.0.0',
      description:
        'Complete REST API for the Kingsforth Intelligence Platform. Built on Payload CMS with PostgreSQL.\n\n**Authentication:** Use `POST /api/users/login` to get a JWT token, then include it as `Authorization: JWT <token>` header.',
      contact: { name: 'Kingsforth Admin', email: 'admin@kingsforth.net' },
    },
    servers: [{ url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000', description: 'API Server' }],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management' },
      { name: 'Services', description: 'Service catalog with pricing plans' },
      { name: 'Solutions', description: 'Industry & use-case solutions' },
      { name: 'Resources', description: 'Blog posts & case studies' },
      { name: 'FAQs', description: 'Frequently asked questions' },
      { name: 'Team Members', description: 'Team member profiles' },
      { name: 'Companies', description: 'Client companies' },
      { name: 'Subscriptions', description: 'Service subscriptions' },
      { name: 'Invoices', description: 'Billing invoices' },
      { name: 'Leads', description: 'Demo requests & leads' },
      { name: 'Support Tickets', description: 'Customer support' },
      { name: 'Media', description: 'Media library' },
      { name: 'Partner Logos', description: 'Partner logo assets' },
      { name: 'Product Features', description: 'Product feature showcase' },
      { name: 'How It Works', description: 'Process steps' },
      { name: 'Pages', description: 'CMS pages' },
      { name: 'Knowledge Base', description: 'Help articles' },
      { name: 'Analytics', description: 'Usage analytics' },
      { name: 'Audit Logs', description: 'System audit trail' },
      { name: 'Email Campaigns', description: 'Marketing campaigns' },
      { name: 'Globals', description: 'Site-wide settings & content' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Format: JWT <token> — obtain from /api/users/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            email: { type: 'string', format: 'email', example: 'admin@kingsforth.net' },
            name: { type: 'string', example: 'Admin User' },
            role: { type: 'string', enum: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'STAFF'] },
            company: { type: 'integer', nullable: true },
            avatar: { type: 'integer', nullable: true },
            phone: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        UserCreate: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', example: 'SecurePass123' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', enum: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'STAFF'], default: 'STAFF' },
            company: { type: 'integer', nullable: true },
            phone: { type: 'string', nullable: true },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@kingsforth.net' },
            password: { type: 'string', example: 'Admin@123456' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Auth Passed' },
            user: { $ref: '#/components/schemas/User' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiJ9...' },
            exp: { type: 'integer', example: 1712345678 },
          },
        },
        Service: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            slug: { type: 'string', example: 'cognitive-surveillance' },
            title: { type: 'string', example: 'Cognitive Surveillance' },
            subtitle: { type: 'string' },
            description: { type: 'object', description: 'Lexical rich text JSON' },
            icon: { type: 'string', example: 'eye' },
            category: { type: 'string', enum: ['surveillance', 'forensic', 'automation', 'iot', 'consulting', 'other'] },
            orderIndex: { type: 'integer' },
            isPublished: { type: 'boolean' },
            features: { type: 'array', items: { type: 'object' } },
            plans: { type: 'array', items: { type: 'object' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ServiceCreate: {
          type: 'object',
          required: ['title', 'slug'],
          properties: {
            title: { type: 'string' },
            slug: { type: 'string' },
            subtitle: { type: 'string' },
            description: { type: 'object' },
            icon: { type: 'string' },
            category: { type: 'string' },
            isPublished: { type: 'boolean', default: false },
            features: { type: 'array', items: { type: 'object' } },
            plans: { type: 'array', items: { type: 'object' } },
          },
        },
        Solution: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            slug: { type: 'string' },
            title: { type: 'string' },
            subtitle: { type: 'string' },
            description: { type: 'object' },
            icon: { type: 'string' },
            industry: { type: 'string' },
            isPublished: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        FAQ: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            question: { type: 'string' },
            answer: { type: 'object', description: 'Lexical rich text JSON' },
            category: { type: 'string' },
            orderIndex: { type: 'integer' },
            isPublished: { type: 'boolean' },
          },
        },
        TeamMember: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            role: { type: 'string' },
            bio: { type: 'object' },
            avatar: { type: 'integer', description: 'Media ID' },
            orderIndex: { type: 'integer' },
            isPublished: { type: 'boolean' },
            socials: { type: 'object' },
          },
        },
        Company: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            domain: { type: 'string' },
            plan: { type: 'string' },
            status: { type: 'string', enum: ['active', 'suspended', 'trial', 'cancelled'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Subscription: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            company: { type: 'integer' },
            service: { type: 'integer' },
            plan: { type: 'string' },
            status: { type: 'string', enum: ['active', 'paused', 'cancelled', 'trial'] },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        Invoice: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            company: { type: 'integer' },
            amount: { type: 'number' },
            currency: { type: 'string', example: 'USD' },
            status: { type: 'string', enum: ['pending', 'paid', 'overdue', 'cancelled'] },
            dueDate: { type: 'string', format: 'date-time' },
            paidAt: { type: 'string', format: 'date-time', nullable: true },
          },
        },
        Lead: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            company: { type: 'string' },
            message: { type: 'string' },
            source: { type: 'string' },
            status: { type: 'string', enum: ['new', 'contacted', 'qualified', 'lost'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        LeadCreate: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            company: { type: 'string' },
            message: { type: 'string' },
            source: { type: 'string' },
          },
        },
        SupportTicket: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            subject: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['open', 'in_progress', 'resolved', 'closed'] },
            priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
            createdBy: { type: 'integer' },
            assignedTo: { type: 'integer', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        SiteSettings: {
          type: 'object',
          properties: {
            siteName: { type: 'string' },
            tagline: { type: 'string' },
            logo: { type: 'integer', description: 'Media ID' },
            favicon: { type: 'integer', description: 'Media ID' },
            primaryColor: { type: 'string' },
            contactEmail: { type: 'string', format: 'email' },
            contactPhone: { type: 'string' },
            address: { type: 'string' },
            socialLinks: { type: 'object' },
            analyticsId: { type: 'string' },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            docs: { type: 'array', items: { type: 'object' } },
            totalDocs: { type: 'integer' },
            limit: { type: 'integer' },
            totalPages: { type: 'integer' },
            page: { type: 'integer' },
            pagingCounter: { type: 'integer' },
            hasPrevPage: { type: 'boolean' },
            hasNextPage: { type: 'boolean' },
            prevPage: { type: 'integer', nullable: true },
            nextPage: { type: 'integer', nullable: true },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'object', properties: { message: { type: 'string' }, name: { type: 'string' } } } },
          },
        },
      },
    },
    paths: {} as Record<string, any>,
  };

  function addCollectionPaths(
    slug: string,
    tag: string,
    schemaName: string,
    createSchemaName?: string | null,
    opts: { publicRead?: boolean; publicCreate?: boolean } = {},
  ) {
    const { publicRead = false, publicCreate = false } = opts;
    const singular = tag.replace(/s$/, '');
    const cs = createSchemaName || schemaName;

    spec.paths[`/api/${slug}`] = {
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
        },
      },
      post: {
        tags: [tag],
        summary: `Create ${singular}`,
        operationId: `create${schemaName}`,
        security: publicCreate ? [] : [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: `#/components/schemas/${cs}` } } },
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' }, doc: { $ref: `#/components/schemas/${schemaName}` } } } } } },
          400: { description: 'Validation Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          401: { description: 'Unauthorized' },
        },
      },
    };

    spec.paths[`/api/${slug}/{id}`] = {
      get: {
        tags: [tag],
        summary: `Get ${singular} by ID`,
        operationId: `get${schemaName}ById`,
        security: publicRead ? [] : [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          { name: 'depth', in: 'query', schema: { type: 'integer', default: 1 } },
        ],
        responses: {
          200: { description: 'Success', content: { 'application/json': { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
          404: { description: 'Not Found' },
        },
      },
      patch: {
        tags: [tag],
        summary: `Update ${singular}`,
        operationId: `update${schemaName}`,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: `#/components/schemas/${cs}` } } },
        },
        responses: {
          200: { description: 'Updated' },
          400: { description: 'Validation Error' },
          401: { description: 'Unauthorized' },
        },
      },
      delete: {
        tags: [tag],
        summary: `Delete ${singular}`,
        operationId: `delete${schemaName}`,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Deleted' },
          401: { description: 'Unauthorized' },
          404: { description: 'Not Found' },
        },
      },
    };
  }

  // Auth endpoints
  spec.paths['/api/users/login'] = {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      operationId: 'login',
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
      responses: {
        200: { description: 'Success', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
        401: { description: 'Invalid credentials' },
      },
    },
  };
  spec.paths['/api/users/logout'] = {
    post: {
      tags: ['Auth'],
      summary: 'Logout',
      operationId: 'logout',
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: 'Logged out' } },
    },
  };
  spec.paths['/api/users/me'] = {
    get: {
      tags: ['Auth'],
      summary: 'Get Current User',
      operationId: 'getCurrentUser',
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Success', content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } } },
        401: { description: 'Not authenticated' },
      },
    },
  };
  spec.paths['/api/users/refresh-token'] = {
    post: {
      tags: ['Auth'],
      summary: 'Refresh Token',
      operationId: 'refreshToken',
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: 'New token' } },
    },
  };

  // Collections
  addCollectionPaths('users', 'Users', 'User', 'UserCreate', { publicCreate: true });
  addCollectionPaths('services', 'Services', 'Service', 'ServiceCreate', { publicRead: true });
  addCollectionPaths('solutions', 'Solutions', 'Solution', null, { publicRead: true });
  addCollectionPaths('resources', 'Resources', 'Solution', null, { publicRead: true });
  addCollectionPaths('faqs', 'FAQs', 'FAQ', null, { publicRead: true });
  addCollectionPaths('team-members', 'Team Members', 'TeamMember', null, { publicRead: true });
  addCollectionPaths('companies', 'Companies', 'Company');
  addCollectionPaths('subscriptions', 'Subscriptions', 'Subscription');
  addCollectionPaths('invoices', 'Invoices', 'Invoice');
  addCollectionPaths('leads', 'Leads', 'Lead', 'LeadCreate', { publicCreate: true });
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

  // Globals
  spec.paths['/api/globals/site-settings'] = {
    get: {
      tags: ['Globals'],
      summary: 'Get Site Settings',
      operationId: 'getSiteSettings',
      responses: { 200: { description: 'Success', content: { 'application/json': { schema: { $ref: '#/components/schemas/SiteSettings' } } } } },
    },
    post: {
      tags: ['Globals'],
      summary: 'Update Site Settings',
      operationId: 'updateSiteSettings',
      security: [{ bearerAuth: [] }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/SiteSettings' } } } },
      responses: { 200: { description: 'Updated' } },
    },
  };
  spec.paths['/api/globals/pricing-config'] = {
    get: { tags: ['Globals'], summary: 'Get Pricing Config', operationId: 'getPricingConfig', responses: { 200: { description: 'Success' } } },
    post: { tags: ['Globals'], summary: 'Update Pricing Config', operationId: 'updatePricingConfig', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Updated' } } },
  };
  spec.paths['/api/globals/about-content'] = {
    get: { tags: ['Globals'], summary: 'Get About Content', operationId: 'getAboutContent', responses: { 200: { description: 'Success' } } },
    post: { tags: ['Globals'], summary: 'Update About Content', operationId: 'updateAboutContent', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { 200: { description: 'Updated' } } },
  };

  return spec;
}

export async function GET() {
  return NextResponse.json(buildSpec(), {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}
