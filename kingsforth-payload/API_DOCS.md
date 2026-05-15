# Kingsforth Platform — REST API Documentation

> **Base URL:** `http://localhost:3000/api`
>
> Payload CMS automatically generates a full REST API for every collection and global. This document covers all endpoints, authentication, and Postman-ready examples.

---

## Table of Contents

1. [Authentication](#authentication)
2. [Collections API](#collections-api)
   - [Users](#users)
   - [Services](#services)
   - [Solutions](#solutions)
   - [Resources](#resources-blogcase)
   - [FAQs](#faqs)
   - [Team Members](#team-members)
   - [Companies](#companies)
   - [Subscriptions](#subscriptions)
   - [Invoices](#invoices)
   - [Leads](#leads)
   - [Support Tickets](#support-tickets)
   - [Media](#media)
   - [Partner Logos](#partner-logos)
   - [Product Features](#product-features)
   - [How It Works Steps](#how-it-works-steps)
   - [Pages](#pages)
   - [Knowledge Base](#knowledge-base)
   - [Analytics](#analytics)
   - [Audit Logs](#audit-logs)
   - [Email Campaigns](#email-campaigns)
3. [Globals API](#globals-api)
   - [Site Settings](#site-settings)
   - [About Content](#about-content)
4. [Query Operators](#query-operators)
5. [Postman Collection Import](#postman-collection-import)

---

## Authentication

Payload uses **JWT** (JSON Web Tokens) for authentication. All protected endpoints require a `Bearer` token in the `Authorization` header.

### Login

```
POST /api/users/login
Content-Type: application/json

{
  "email": "admin@kingsforth.net",
  "password": "Admin@123456"
}
```

**Response (200):**
```json
{
  "message": "Auth Passed",
  "user": { "id": 1, "email": "admin@kingsforth.net", "role": "SUPER_ADMIN", ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "exp": 1712345678
}
```

### Register (Create Account)

```
POST /api/users
Content-Type: application/json

{
  "email": "newuser@company.com",
  "password": "SecurePass123",
  "name": "New User"
}
```

> **Note:** New users are assigned `STAFF` role by default. Only a `SUPER_ADMIN` can change roles.

### Get Current User (Me)

```
GET /api/users/me
Authorization: JWT <token>
```

### Logout

```
POST /api/users/logout
Authorization: JWT <token>
```

### Refresh Token

```
POST /api/users/refresh-token
Authorization: JWT <token>
```

---

## Collections API

Every collection follows this standard REST pattern:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/{slug}` | List all documents (paginated) |
| `GET` | `/api/{slug}/{id}` | Get a single document by ID |
| `POST` | `/api/{slug}` | Create a new document |
| `PATCH` | `/api/{slug}/{id}` | Update a document |
| `DELETE` | `/api/{slug}/{id}` | Delete a document |

### Standard Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `limit` | number | Max results per page (default: 10) | `?limit=25` |
| `page` | number | Page number | `?page=2` |
| `sort` | string | Sort by field (prefix with `-` for descending) | `?sort=-createdAt` |
| `where` | object | Filter results (see [Query Operators](#query-operators)) | `?where[role][equals]=SUPER_ADMIN` |
| `depth` | number | Depth of relationship population (default: 1) | `?depth=2` |

---

### Users

**Slug:** `users`

**Roles:** `SUPER_ADMIN`, `COMPANY_ADMIN`, `STAFF`

#### List Users (Admin only)
```
GET /api/users?limit=50
Authorization: JWT <token>
```

#### Get User by ID
```
GET /api/users/1
Authorization: JWT <token>
```

#### Update User Role (SUPER_ADMIN only)
```
PATCH /api/users/2
Authorization: JWT <token>
Content-Type: application/json

{
  "role": "COMPANY_ADMIN"
}
```

#### Delete User (SUPER_ADMIN only)
```
DELETE /api/users/2
Authorization: JWT <token>
```

---

### Services

**Slug:** `services`

> Public users can read published services. Only `SUPER_ADMIN` can create/update/delete.

#### List All Published Services (Public)
```
GET /api/services?where[isPublished][equals]=true&sort=orderIndex
```

#### Get Service by Slug
```
GET /api/services?where[slug][equals]=cognitive-surveillance
```

#### Create Service (Admin)
```
POST /api/services
Authorization: JWT <token>
Content-Type: application/json

{
  "slug": "new-service",
  "title": "New Service",
  "subtitle": "Service tagline",
  "category": "surveillance",
  "icon": "shield",
  "orderIndex": 7,
  "isPublished": true,
  "features": [
    { "icon": "eye", "title": "Feature One", "description": "Description here" }
  ],
  "plans": [
    {
      "name": "Plus",
      "price": 99,
      "billingPeriod": "MONTHLY",
      "description": "For small teams",
      "planFeatures": [
        { "feature": "Up to 5 cameras" },
        { "feature": "24/7 monitoring" }
      ]
    },
    {
      "name": "Enterprise",
      "price": 499,
      "billingPeriod": "MONTHLY",
      "description": "Unlimited scale",
      "planFeatures": [
        { "feature": "Unlimited cameras" },
        { "feature": "Dedicated support" },
        { "feature": "Custom integrations" }
      ]
    }
  ],
  "metaTitle": "New Service | Kingsforth",
  "metaDescription": "SEO description here"
}
```

#### Update Service (Admin)
```
PATCH /api/services/3
Authorization: JWT <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "isPublished": false
}
```

#### Delete Service (Admin)
```
DELETE /api/services/3
Authorization: JWT <token>
```

---

### Solutions

**Slug:** `solutions`

#### List All Published Solutions (Public)
```
GET /api/solutions?where[isPublished][equals]=true
```

#### Get Solution by Slug
```
GET /api/solutions?where[slug][equals]=education
```

#### Create Solution (Admin)
```
POST /api/solutions
Authorization: JWT <token>
Content-Type: application/json

{
  "slug": "healthcare",
  "title": "Healthcare",
  "category": "Industry",
  "subtitle": "Hospital & Clinical Safety",
  "isPublished": true
}
```

---

### Resources (Blog/Case)

**Slug:** `resources`

#### List Published Resources (Public)
```
GET /api/resources?where[isPublished][equals]=true&sort=-createdAt
```

#### Create Resource (Admin)
```
POST /api/resources
Authorization: JWT <token>
Content-Type: application/json

{
  "title": "How AI is Transforming Security",
  "slug": "ai-transforming-security",
  "type": "blog",
  "content": { ... },
  "isPublished": true
}
```

---

### FAQs

**Slug:** `faqs`

#### List All FAQs (Public)
```
GET /api/faqs?sort=sortOrder
```

#### Create FAQ (Admin)
```
POST /api/faqs
Authorization: JWT <token>
Content-Type: application/json

{
  "question": "How does Kingsforth work?",
  "answer": "Kingsforth uses AI to transform security cameras into intelligent monitoring systems.",
  "category": "General",
  "sortOrder": 3
}
```

---

### Team Members

**Slug:** `team-members`

#### List Team (Public)
```
GET /api/team-members?sort=sortOrder
```

#### Create Team Member (Admin)
```
POST /api/team-members
Authorization: JWT <token>
Content-Type: application/json

{
  "name": "John Doe",
  "role": "VP of Engineering",
  "bio": "15 years of experience in AI systems",
  "sortOrder": 4
}
```

---

### Companies

**Slug:** `companies`

#### List Companies (Admin)
```
GET /api/companies?limit=50
Authorization: JWT <token>
```

#### Create Company (Admin)
```
POST /api/companies
Authorization: JWT <token>
Content-Type: application/json

{
  "name": "Acme Corp",
  "industry": "Technology",
  "address": "123 Main St, NYC"
}
```

---

### Subscriptions

**Slug:** `subscriptions`

#### List Subscriptions (Admin)
```
GET /api/subscriptions?depth=2
Authorization: JWT <token>
```

#### Create Subscription (Admin)
```
POST /api/subscriptions
Authorization: JWT <token>
Content-Type: application/json

{
  "company": 1,
  "service": 1,
  "status": "ACTIVE",
  "startDate": "2026-04-01",
  "endDate": "2027-04-01",
  "usersAllowed": 10
}
```

---

### Invoices

**Slug:** `invoices`

#### List Invoices (Admin)
```
GET /api/invoices?sort=-createdAt&depth=2
Authorization: JWT <token>
```

#### Create Invoice (Admin)
```
POST /api/invoices
Authorization: JWT <token>
Content-Type: application/json

{
  "subscription": 1,
  "amount": 499.00,
  "status": "SENT",
  "billingPeriodStart": "2026-04-01",
  "billingPeriodEnd": "2026-04-30"
}
```

---

### Leads

**Slug:** `leads`

#### List Leads (Admin)
```
GET /api/leads?sort=-createdAt
Authorization: JWT <token>
```

#### Submit Lead (Public — demo request form)
```
POST /api/leads
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "company": "Company Inc",
  "phone": "+1234567890",
  "message": "Interested in a demo",
  "source": "website"
}
```

---

### Support Tickets

**Slug:** `support-tickets`

#### List Tickets (Admin)
```
GET /api/support-tickets?sort=-createdAt&depth=2
Authorization: JWT <token>
```

#### Create Ticket
```
POST /api/support-tickets
Authorization: JWT <token>
Content-Type: application/json

{
  "title": "Cannot access dashboard",
  "description": "Getting a 403 error when trying to access...",
  "status": "OPEN",
  "company": 1,
  "user": 2
}
```

---

### Media

**Slug:** `media`

#### Upload Media (Admin)
```
POST /api/media
Authorization: JWT <token>
Content-Type: multipart/form-data

file: <binary file>
alt: "Company logo"
```

#### List Media
```
GET /api/media?limit=50
Authorization: JWT <token>
```

---

### Partner Logos

**Slug:** `partner-logos`

#### List Partner Logos (Public)
```
GET /api/partner-logos?sort=sortOrder
```

---

### Product Features

**Slug:** `product-features`

#### List Features (Public)
```
GET /api/product-features?sort=displayOrder
```

---

### How It Works Steps

**Slug:** `how-it-works-steps`

#### List Steps (Public)
```
GET /api/how-it-works-steps?sort=sortOrder
```

---

### Pages

**Slug:** `pages`

#### Get Page by Slug
```
GET /api/pages?where[slug][equals]=privacy-policy
```

---

### Knowledge Base

**Slug:** `knowledge-base`

#### List Published Articles (Public)
```
GET /api/knowledge-base?where[published][equals]=true
```

---

### Analytics

**Slug:** `analytics`

#### Get Analytics (Admin)
```
GET /api/analytics?where[company][equals]=1&sort=-date
Authorization: JWT <token>
```

---

### Audit Logs

**Slug:** `audit-logs`

#### List Audit Logs (Admin)
```
GET /api/audit-logs?sort=-createdAt&limit=100
Authorization: JWT <token>
```

---

### Email Campaigns

**Slug:** `email-campaigns`

#### List Campaigns (Admin)
```
GET /api/email-campaigns?sort=-createdAt
Authorization: JWT <token>
```

---

## Globals API

Globals are singleton documents (site-wide settings). They have a different endpoint pattern:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/globals/{slug}` | Read the global |
| `POST` | `/api/globals/{slug}` | Update the global |

### Site Settings

```
GET /api/globals/site-settings
```

**Response:**
```json
{
  "siteName": "Kingsforth",
  "siteTagline": "Enterprise Intelligence Systems",
  "siteLogo": { ... },
  "socialLinks": {
    "facebook": "https://facebook.com/kingsforth",
    "instagram": "https://instagram.com/kingsforth",
    "twitter": "https://x.com/kingsforth",
    "linkedin": "https://linkedin.com/company/kingsforth",
    "youtube": "https://youtube.com/@kingsforth"
  },
  "partnerLogosEnabled": true,
  "teamSectionHeading": "Meet The Operators",
  "aboutSectionHeading": "Our Mission",
  "emailFromName": "Kingsforth Team",
  "emailFromAddress": "noreply@kingsforth.net"
}
```

#### Update Site Settings (SUPER_ADMIN only)
```
POST /api/globals/site-settings
Authorization: JWT <token>
Content-Type: application/json

{
  "siteName": "Kingsforth Technologies",
  "socialLinks": {
    "facebook": "https://facebook.com/kingsforthtech"
  }
}
```

### About Content

```
GET /api/globals/about-content
```

#### Update About Content (SUPER_ADMIN only)
```
POST /api/globals/about-content
Authorization: JWT <token>
Content-Type: application/json

{
  "heading": "About Kingsforth",
  "description": "Updated mission statement..."
}
```

---

## Query Operators

Payload supports powerful query filtering via the `where` parameter.

| Operator | Description | Example |
|----------|-------------|---------|
| `equals` | Exact match | `?where[role][equals]=SUPER_ADMIN` |
| `not_equals` | Not equal | `?where[status][not_equals]=CANCELLED` |
| `greater_than` | Greater than | `?where[price][greater_than]=100` |
| `less_than` | Less than | `?where[orderIndex][less_than]=5` |
| `greater_than_equal` | >= | `?where[amount][greater_than_equal]=50` |
| `less_than_equal` | <= | `?where[amount][less_than_equal]=500` |
| `like` | Partial text match (case-insensitive) | `?where[title][like]=surveillance` |
| `contains` | Contains substring | `?where[name][contains]=john` |
| `in` | Value in list | `?where[category][in]=forensic,surveillance` |
| `not_in` | Value not in list | `?where[status][not_in]=CANCELLED` |
| `exists` | Field exists (true/false) | `?where[avatar][exists]=true` |

### Combining Queries (AND / OR)

**AND (default):**
```
GET /api/services?where[isPublished][equals]=true&where[category][equals]=surveillance
```

**OR:**
```
GET /api/services?where[or][0][category][equals]=forensic&where[or][1][category][equals]=surveillance
```

---

## Postman Collection Import

### Quick Setup

1. Open Postman
2. Create a new **Environment** called `Kingsforth Local`:
   - `base_url` = `http://localhost:3000/api`
   - `token` = (leave blank, fill after login)

3. For every request, set:
   - **URL:** `{{base_url}}/services` (example)
   - **Headers:**
     - `Authorization`: `JWT {{token}}`
     - `Content-Type`: `application/json`

4. **Login first** to get your token:
   - `POST {{base_url}}/users/login`
   - Copy the `token` from the response into your `token` environment variable

### Pre-request Script (Auto-login)

Add this as a **Collection-level Pre-request Script** in Postman to auto-authenticate:

```javascript
const baseUrl = pm.environment.get("base_url");

if (!pm.environment.get("token")) {
    pm.sendRequest({
        url: baseUrl + '/users/login',
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                email: 'admin@kingsforth.net',
                password: 'Admin@123456'
            })
        }
    }, function (err, res) {
        if (!err) {
            const token = res.json().token;
            pm.environment.set("token", token);
        }
    });
}
```

---

## Access Control Summary

| Resource | Public Read | Auth Read | Create | Update | Delete |
|----------|-----------|-----------|--------|--------|--------|
| Services (published) | ✅ | ✅ | SUPER_ADMIN | SUPER_ADMIN | SUPER_ADMIN |
| Solutions (published) | ✅ | ✅ | SUPER_ADMIN | SUPER_ADMIN | SUPER_ADMIN |
| FAQs | ✅ | ✅ | SUPER_ADMIN | SUPER_ADMIN | SUPER_ADMIN |
| Team Members | ✅ | ✅ | SUPER_ADMIN | SUPER_ADMIN | SUPER_ADMIN |
| Leads | ❌ | ADMIN+ | ✅ (public) | ADMIN+ | SUPER_ADMIN |
| Users | Self only | SUPER_ADMIN | ✅ (public signup) | Self/ADMIN | SUPER_ADMIN |
| Companies | ❌ | ADMIN+ | ADMIN+ | ADMIN+ | SUPER_ADMIN |
| Site Settings | ✅ | ✅ | — | SUPER_ADMIN | — |
| Media | ✅ | ✅ | Auth | Auth | SUPER_ADMIN |

---

> **Dashboard URL:** http://localhost:3000/admin
>
> **API Base URL:** http://localhost:3000/api
