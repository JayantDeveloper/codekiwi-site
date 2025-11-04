# CodeKiwi Site (Marketing + Teacher Portal)

> The official landing page and teacher onboarding portal for [CodeKiwi](https://codekiwi.tech) — a platform that lets educators run live, interactive coding lessons with synced slides.

![CodeKiwi](https://img.shields.io/badge/CodeKiwi-Commercial-purple)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3+-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 Overview

This is the public-facing website and teacher portal for CodeKiwi. Built with Next.js 14, TypeScript, and TailwindCSS, it serves as both a marketing site to attract educators and a dashboard for teachers to manage their coding sessions.

### Key Features

- 🌎 **Marketing Landing Page** — Hero section, features showcase, pricing plans, testimonials
- 👩‍🏫 **Teacher Portal** — Account creation, session management, and classroom access
- 💳 **Payment Integration** — Stripe checkout for subscription plans
- 📚 **Documentation Hub** — Getting started guides, FAQs, and best practices
- 📊 **Analytics Dashboard** — Session history, student engagement metrics
- 🔐 **Authentication** — Secure login/signup for teachers

### Part of the CodeKiwi Ecosystem

- 🌐 **Live Platform**: [codekiwi.tech](https://codekiwi.tech)
- 💻 **Classroom Frontend**: [slide-syncer-frontend](https://github.com/JayantDeveloper/slide-syncer-frontend)
- ⚙️ **Backend API**: [slide-syncer-backend](https://github.com/JayantDeveloper/slide-syncer-backend)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Accounts Needed**:
  - Vercel (for deployment)
  - Stripe (for payments, optional)
  - Backend API running (see [backend repo](https://github.com/JayantDeveloper/slide-syncer-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/JayantDeveloper/codekiwi-site.git
cd codekiwi-site

# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env.local` file:

```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.codekiwi.tech

# Authentication (NextAuth.js)
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Stripe (optional for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (for notifications)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@codekiwi.tech
```

### Development

Start the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Production Build

```bash
# Build
pnpm build

# Start production server
pnpm start
```

---

## 📂 Project Structure

```
codekiwi-site/
├── app/                      # Next.js 14 App Router
│   ├── (marketing)/         # Public pages
│   │   ├── page.tsx         # Landing page
│   │   ├── features/        # Features showcase
│   │   ├── pricing/         # Pricing page
│   │   └── about/           # About page
│   ├── (auth)/              # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/           # Teacher dashboard
│   │   ├── page.tsx         # Dashboard home
│   │   ├── sessions/        # Session management
│   │   ├── analytics/       # Analytics
│   │   └── settings/        # Account settings
│   ├── docs/                # Documentation
│   └── api/                 # API routes
│       ├── auth/            # NextAuth handlers
│       └── webhooks/        # Stripe webhooks
├── components/
│   ├── marketing/           # Landing page components
│   ├── dashboard/           # Dashboard components
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   └── layout/              # Layout components
├── lib/
│   ├── api.ts              # API client functions
│   ├── stripe.ts           # Stripe integration
│   └── utils.ts            # Utility functions
├── public/
│   ├── images/
│   └── videos/
└── styles/
    └── globals.css
```

---

## 🎨 Pages & Routes

### Public Pages

#### Landing Page (`/`)
```
- Hero section with CTA
- Feature highlights
- How it works demo video
- Testimonials
- Pricing preview
- Footer with links
```

#### Features (`/features`)
```
- Real-time synchronization
- Code editor capabilities
- Session management
- Student tracking
- Analytics & insights
```

#### Pricing (`/pricing`)
```
- Free tier (up to 10 students)
- Pro tier ($19/month - up to 50 students)
- School tier (custom pricing)
- Feature comparison table
```

#### About (`/about`)
```
- Our mission
- Team bios
- Contact information
```

### Authenticated Pages

#### Dashboard (`/dashboard`)
```
- Recent sessions overview
- Quick start: Create new session
- Student engagement stats
- Upcoming scheduled sessions
```

#### Sessions (`/dashboard/sessions`)
```
- All sessions list
- Create new session
- Session details
- Join/manage active sessions
```

#### Analytics (`/dashboard/analytics`)
```
- Session completion rates
- Student participation metrics
- Code submission stats
- Export reports
```

#### Settings (`/dashboard/settings`)
```
- Profile information
- Password change
- Subscription management
- Notification preferences
```

### Documentation (`/docs`)
```
- Getting started guide
- Teacher tutorials
- Student instructions
- FAQs
- Troubleshooting
```

---

## 🔐 Authentication

Uses NextAuth.js for secure authentication:

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Authenticate against backend API
        const user = await verifyCredentials(credentials);
        return user || null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  }
};
```

---

## 💳 Stripe Integration

### Subscription Plans

```typescript
// lib/stripe.ts
export const plans = {
  free: {
    name: 'Free',
    price: 0,
    maxStudents: 10,
    maxSessions: 5,
    features: ['Basic features', 'Up to 10 students']
  },
  pro: {
    name: 'Pro',
    price: 1900, // $19.00 in cents
    priceId: 'price_1234567890',
    maxStudents: 50,
    maxSessions: -1, // unlimited
    features: [
      'All features',
      'Up to 50 students',
      'Unlimited sessions',
      'Analytics dashboard',
      'Priority support'
    ]
  },
  school: {
    name: 'School',
    price: 'custom',
    contact: true,
    features: [
      'Everything in Pro',
      'Unlimited students',
      'Multiple teachers',
      'Custom branding',
      'Dedicated support',
      'SSO integration'
    ]
  }
};
```

### Checkout Flow

```typescript
// app/api/checkout/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const { priceId, userId } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    customer: userId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing?checkout=canceled`,
  });
  
  return Response.json({ sessionId: session.id });
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JayantDeveloper/codekiwi-site)

**Automatic Deployment:**

1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy automatically on every commit to `main`

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify

1. Connect GitHub repository
2. **Build command**: `pnpm build`
3. **Publish directory**: `.next`
4. **Environment variables**: Add from `.env.local`

### Docker

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t codekiwi-site .
docker run -p 3000:3000 codekiwi-site
```

---

## 🎨 Customization

### Branding

Update brand colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e', // Primary brand color
          600: '#16a34a',
          900: '#14532d',
        }
      }
    }
  }
}
```

### Content

Edit marketing content in:
- `app/(marketing)/page.tsx` — Landing page
- `components/marketing/Hero.tsx` — Hero section
- `components/marketing/Features.tsx` — Features list

### Styling

Uses TailwindCSS + shadcn/ui components:

```bash
# Add new shadcn/ui component
pnpx shadcn-ui@latest add button
pnpx shadcn-ui@latest add card
pnpx shadcn-ui@latest add dialog
```

---

## 📊 Analytics

### Google Analytics

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Custom Analytics

Track user events:

```typescript
// lib/analytics.ts
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Usage
trackEvent('session_created', {
  session_id: 'ABC123',
  student_count: 15
});
```

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# E2E tests with Playwright
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

### Example Test

```typescript
// __tests__/landing.test.tsx
import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';

describe('Landing Page', () => {
  it('renders hero section', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Interactive Coding Lessons/i)).toBeInTheDocument();
  });

  it('displays pricing plans', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Free/i)).toBeInTheDocument();
    expect(screen.getByText(/Pro/i)).toBeInTheDocument();
  });
});
```

---

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: TailwindCSS 3+
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Forms**: React Hook Form + Zod
- **State**: React Context + Server Components
- **Analytics**: Google Analytics
- **Deployment**: Vercel
- **Email**: Resend / SendGrid

---

## 🤝 Contributing

We welcome contributions to improve the site!

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/ui-improvement`)
3. **Commit** changes (`git commit -m 'Improve landing page CTAs'`)
4. **Push** to branch (`git push origin feature/ui-improvement`)
5. **Open** a Pull Request

### Design Guidelines

- Follow existing TailwindCSS patterns
- Maintain responsive design (mobile-first)
- Ensure accessibility (WCAG 2.1 AA)
- Use shadcn/ui components when possible
- Keep components small and reusable

---

## 🐛 Known Issues & Roadmap

### Current Limitations

- No mobile app (responsive web only)
- Limited localization (English only)
- Basic analytics (no custom reports yet)

### Upcoming Features

- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)
- [ ] Custom domain support for schools
- [ ] Advanced analytics dashboard
- [ ] Blog/resources section
- [ ] Community forum
- [ ] Video tutorials library
- [ ] API documentation portal

---

## 📚 Related Repositories

### Classroom Frontend
**[slide-syncer-frontend](https://github.com/JayantDeveloper/slide-syncer-frontend)**  
React classroom interface where the actual teaching happens.

### Backend API
**[slide-syncer-backend](https://github.com/JayantDeveloper/slide-syncer-backend)**  
Express server handling real-time sync and data management.

---

## 🔐 Security

- HTTPS only in production
- CSRF protection enabled
- Content Security Policy headers
- Rate limiting on API routes
- Input sanitization
- SQL injection prevention
- XSS protection

**Security Issues**: Please email security@codekiwi.tech

---

## 📄 License

MIT © 2025 Jayant Maheshwari

---

## 💬 Support

- **Documentation**: [docs.codekiwi.tech](https://docs.codekiwi.tech)
- **Issues**: [GitHub Issues](https://github.com/JayantDeveloper/codekiwi-site/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JayantDeveloper/codekiwi-site/discussions)
- **Email**: support@codekiwi.tech
- **Twitter**: [@codekiwi](https://twitter.com/codekiwi)

---

## 🌟 Acknowledgments

Built with these amazing tools:
- **Next.js** — The React Framework for Production
- **TailwindCSS** — Utility-first CSS framework
- **shadcn/ui** — Beautiful, accessible components
- **Vercel** — Best-in-class deployment platform
- **Stripe** — Payment infrastructure

Special thanks to:
- The teaching community for feedback
- Early adopters and beta testers
- Open-source contributors

---

**Empowering educators to teach code interactively** 🎓💻

🌐 [codekiwi.tech](https://codekiwi.tech) | 📖 [Docs](https://docs.codekiwi.tech) | 🐦 [Twitter](https://twitter.com/codekiwi)
