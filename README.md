# SvelteKit + PocketBase Starter

A modern, full-stack boilerplate combining SvelteKit with PocketBase for rapid application development. Features TypeScript, Tailwind CSS, and DaisyUI for a complete development experience.

## 🚀 Tech Stack

- **Frontend**: SvelteKit with TypeScript
- **Backend**: PocketBase (SQLite-based BaaS)
- **Styling**: Tailwind CSS + DaisyUI
- **Authentication**: Built-in PocketBase auth

## 📁 Project Structure

```
project/
├── frontend/          # SvelteKit application
└── backend/           # PocketBase server
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Backend Setup

1. **Download PocketBase**

   - Get the latest release from [pocketbase.io](https://pocketbase.io/docs/)
   - Extract to `/backend` folder

2. **Start PocketBase**

   ```bash
   cd backend
   ./pocketbase serve
   ```

3. **Configure Admin**
   - Visit `http://localhost:8090/_/`
   - Create your admin account
   - Set up collections as needed

### Frontend Setup

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Access Application**
   - Open `http://localhost:5173`
   - Register a new account or login

## 🔐 Authentication Flow

The boilerplate includes a complete authentication system:

- **Registration**: Create new user accounts
- **Login/Logout**: Secure session management
- **Protected Routes**: Automatic route protection
- **User Dashboard**: Basic user profile management

## 🎨 Styling & Components

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for rapid UI development
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in theme switching

## 📂 Key Features

- ✅ TypeScript support
- ✅ Server-side rendering (SSR)
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ SEO optimized

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run TypeScript checks
npm run lint         # Lint code
```

### Environment Setup

Create `.env` file in frontend directory:

```env
PUBLIC_POCKETBASE_URL=http://localhost:8090
```

## 🚢 Production Deployment

### Frontend

Build and deploy the SvelteKit app to your preferred platform:

```bash
npm run build
```

### Backend

Deploy PocketBase binary with your data directory to any VPS or cloud provider.

## 📝 Customization

1. **Database Schema**: Modify collections in PocketBase admin
2. **UI Components**: Extend DaisyUI components in `/src/lib/components`
3. **Routes**: Add new pages in `/src/routes`
4. **Styling**: Customize Tailwind config in `tailwind.config.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:

- Check the [PocketBase documentation](https://pocketbase.io/docs/)
- Review [SvelteKit documentation](https://kit.svelte.dev/docs)
- Open an issue in this repository

---

**Happy coding!** 🎉
