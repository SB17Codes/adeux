# À Deux 🏠

A minimal PWA for shared household management, built with Next.js, Clerk, and Convex.

## ✨ Features

- **Shared Household**: Auto-created for Seif & Khadija on first sign-in
- **Groceries**: Add items, check/uncheck, live sync
- **Tasks**: Add todos with optional "due today" flag
- **Notes**: Create pinned notes
- **Today View**: See today's tasks and open groceries
- **Profile**: User info and theme toggle (light/dark)
- **PWA**: Installable as a native app

## 🚀 Quick Start

```bash
# Start development (Convex + Next.js)
npm run dev

# Visit http://localhost:3000
# Sign in with Clerk
# App auto-creates household and seed data
```

## 📱 Testing PWA

```bash
# Build for production
npm run build
npm start

# Open http://localhost:3000 in Chrome
# Click install icon in address bar
```

## 🏗️ Architecture

### Tech Stack
- **Next.js 16** (App Router + TypeScript)
- **Clerk** (Authentication)
- **Convex** (Real-time database)
- **Tailwind CSS** (Styling)
- **PWA** (Service Worker + Manifest)

### Database Schema
- `users` - User profiles with Clerk integration
- `households` - Shared household
- `memberships` - User-household relationships
- `lists` - Groceries and todo lists
- `items` - List items (with done, dueDate, etc.)
- `notes` - Pinned notes

### Pages
- `/` - Sign in page
- `/today` - Today's view (default after sign-in)
- `/lists` - Groceries management
- `/tasks` - Tasks management
- `/notes` - Notes management
- `/profile` - User profile and settings

## 📂 Key Files

```
app/
  today/page.tsx          # Today view
  lists/page.tsx          # Groceries
  tasks/page.tsx          # Tasks
  notes/page.tsx          # Notes
  profile/page.tsx        # Profile
components/
  GroceryList.tsx         # Grocery list UI
  TaskList.tsx            # Task list UI
  NoteList.tsx            # Note list UI
  Navigation.tsx          # Nav bar
convex/
  schema.ts               # Database schema
  auth.ts                 # User & household management
  queries/                # Data queries
  mutations/              # Data mutations
public/
  manifest.json           # PWA manifest
  sw.js                   # Service worker
  icon-192.png            # App icon
  icon-512.png            # App icon
middleware.ts             # Clerk auth middleware
```

## ✅ Core Flows

1. **First Sign-in**
   - User created in Convex
   - Household "Seif & Khadija" created
   - Two lists seeded: "Courses" (groceries) and "Tâches" (tasks)
   - Redirected to /today

2. **Add Grocery Item**
   - Navigate to Groceries
   - Type item name
   - Click "Add"
   - Updates live in other sessions

3. **Add Task**
   - Navigate to Tasks
   - Type task name
   - Optionally check "Due today"
   - Click "Add Task"
   - Shows in Today view if due today

4. **Add Note**
   - Navigate to Notes
   - Enter title and content
   - Click "Add Note"
   - Appears pinned at top

5. **View Today**
   - See all tasks due today or without due date
   - See all unchecked grocery items
   - Check/uncheck items inline

6. **Toggle Theme**
   - Navigate to Profile
   - Click theme button
   - Switches between light/dark mode

## 🎯 What's Next (Future Iterations)

- [ ] Offline queue for mutations
- [ ] Animations and transitions
- [ ] User assignment for tasks
- [ ] Multiple households support
- [ ] Edit/unpin notes
- [ ] Quantity display for groceries
- [ ] Date picker for tasks
- [ ] Delete items
- [ ] Filtering and sorting
- [ ] Push notifications
- [ ] Shopping mode (categories)

## 🧪 Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Check setup
./check-setup.sh
```

## 📝 Notes

- This is a minimal v1 focused on core flows
- Real-time sync works out of the box via Convex
- PWA works but offline mutations not queued yet
- Theme persists in localStorage
- Icons are placeholder blue squares with "À2"

## 🤝 Development

Built as a minimal starting point. Ready to iterate and add features!

For detailed setup info, see [SETUP.md](./SETUP.md)


Build your SaaS website in no time! Included:

- Realtime database for implementing your product with
  [Convex](https://convex.dev)
  - Team/organization management
  - Configurable roles and permissions
- Member invite emails using [Resend](https://resend.com)
- User sign-in and sign-up with [Clerk](https://clerk.com)
- Website router with [Next.js](https://nextjs.org/)
- Slick UX with [shadcn/ui](https://ui.shadcn.com/)

Check out [Convex docs](https://docs.convex.dev/home), and
[Convex Ents docs](https://labs.convex.dev/convex-ents)

## Screenshots

<img alt="Personal Account and Teams" src="https://cdn.sanity.io/images/ts10onj4/production/574eeb5fd38aa598e2068b765390e0dc8b220075-1890x742.png" width="400">

<img alt="Members management" src="https://cdn.sanity.io/images/ts10onj4/production/2a0334dddfdc3a52bb7ffb5c74b58edf8a7b9e03-1894x1130.png" width="400">

<img alt="Invites management" src="https://cdn.sanity.io/images/ts10onj4/production/ee70ea18510494e3b67eb58639fc8f11344a4a83-1512x398.png" width="330">

<img alt="Invite accept flow" src="https://cdn.sanity.io/images/ts10onj4/production/afbf9daf190f992af8eadfba6daaf175b7bea679-1864x1070.png" width="400">

## Setting up

```
npm create convex@latest -- -t xixixao/saas-starter
```

Then:

1. Run `npm run dev`
   - It will ask you to set up `CLERK_JWT_ISSUER_DOMAIN`, Follow steps 1 to 3 in
     the
     [Convex Clerk onboarding guide](https://docs.convex.dev/auth/clerk#get-started)
2. Follow step 3 from the
   [Clerk Next.js quickstart](https://clerk.com/docs/quickstarts/nextjs#set-environment-keys),
   setting up both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in
   your `.env.local` file
3. Run `npx convex run init:init` to initialize the permissions and roles in the
   database

If you want to sync Clerk user data via webhooks, check out this
[example repo](https://github.com/thomasballinger/convex-clerk-users-table/).
