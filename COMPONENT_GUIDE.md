# Component Guide

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Navbar.jsx          # Main navigation
│   ├── Navbar.css
│   ├── Footer.jsx          # Site footer
│   ├── Footer.css
│   ├── PageHeader.jsx      # Page title section
│   ├── PageHeader.css
│   ├── Card.jsx            # Reusable card container
│   ├── Card.css
│   ├── Modal.jsx           # Modal dialog
│   └── Modal.css
│
├── context/                 # State management
│   └── AppContext.jsx      # Global app state
│
├── pages/                   # Page components
│   ├── Home.jsx            # Landing page
│   ├── Home.css
│   ├── About.jsx           # About page
│   ├── About.css
│   ├── Programs.jsx        # Programs page
│   ├── Programs.css
│   ├── StudentRegistration.jsx
│   ├── StudentRegistration.css
│   ├── StudentDashboard.jsx
│   ├── StudentDashboard.css
│   ├── Materials.jsx       # Materials browser
│   ├── Materials.css
│   ├── Volunteer.jsx       # Volunteer registration
│   ├── Volunteer.css
│   ├── Activities.jsx      # Activities listing
│   ├── Activities.css
│   ├── Gallery.jsx         # Photo gallery
│   ├── Gallery.css
│   ├── Contact.jsx         # Contact page
│   ├── Contact.css
│   ├── AdminLogin.jsx      # Admin authentication
│   ├── AdminLogin.css
│   ├── AdminDashboard.jsx  # Admin panel
│   └── AdminDashboard.css
│
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## 🧩 Component Documentation

### Navbar Component

**Location**: `src/components/Navbar.jsx`

**Purpose**: Main navigation bar with responsive menu

**Features**:

- Logo and brand name
- Navigation links
- Mobile hamburger menu
- User-specific links (Admin, Dashboard, Logout)
- Sticky positioning

**Usage**:

```jsx
import Navbar from "./components/Navbar";

<Navbar />;
```

---

### Footer Component

**Location**: `src/components/Footer.jsx`

**Purpose**: Site footer with links and information

**Features**:

- Organization description
- Quick links
- Student links
- Social media links
- Copyright notice
- Responsive grid layout

**Usage**:

```jsx
import Footer from "./components/Footer";

<Footer />;
```

---

### PageHeader Component

**Location**: `src/components/PageHeader.jsx`

**Purpose**: Consistent page title section

**Props**:

- `title` (string, required): Page title
- `subtitle` (string, optional): Page subtitle
- `icon` (string, optional): Emoji icon

**Usage**:

```jsx
import PageHeader from "./components/PageHeader";

<PageHeader title="About Us" subtitle="Learn about our mission" icon="ℹ️" />;
```

---

### Card Component

**Location**: `src/components/Card.jsx`

**Purpose**: Reusable card container with hover effects

**Props**:

- `children` (node, required): Card content
- `className` (string, optional): Additional CSS classes

**Usage**:

```jsx
import Card from "./components/Card";

<Card className="custom-class">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>;
```

---

### Modal Component

**Location**: `src/components/Modal.jsx`

**Purpose**: Modal dialog for forms and content

**Props**:

- `isOpen` (boolean, required): Modal visibility state
- `onClose` (function, required): Close handler
- `title` (string, required): Modal title
- `children` (node, required): Modal content

**Features**:

- Overlay with click-to-close
- Close button
- Scroll lock when open
- Escape key to close (can be added)

**Usage**:

```jsx
import Modal from "./components/Modal";
import { useState } from "react";

const [showModal, setShowModal] = useState(false);

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Modal Title">
  <p>Modal content</p>
</Modal>;
```

---

## 🔄 Context API (AppContext)

**Location**: `src/context/AppContext.jsx`

**Purpose**: Global state management for the entire application

### State Variables:

- `user`: Current logged-in user (null if not logged in)
- `students`: Array of registered students
- `volunteers`: Array of registered volunteers
- `materials`: Array of learning materials
- `sessions`: Array of summer sessions

### Functions:

- `login(userData)`: Log in a user
- `logout()`: Log out current user
- `registerStudent(studentData)`: Register a new student
- `registerVolunteer(volunteerData)`: Register a new volunteer
- `addMaterial(materialData)`: Add a new learning material
- `addSession(sessionData)`: Create a new summer session

### Usage:

```jsx
import { useApp } from "./context/AppContext";

function MyComponent() {
  const { user, login, logout, students, materials } = useApp();

  // Use state and functions
  return (
    <div>
      {user ? (
        <p>Welcome, {user.fullName}!</p>
      ) : (
        <button onClick={() => login(userData)}>Login</button>
      )}
    </div>
  );
}
```

---

## 📄 Page Components

### Home Page

**Route**: `/`
**Purpose**: Landing page with mission and CTAs
**Features**: Hero section, statistics, programs preview, CTA section

### About Page

**Route**: `/about`
**Purpose**: Organization background and mission
**Features**: Story, teaching model, mission points, values

### Programs Page

**Route**: `/programs`
**Purpose**: Detailed program information
**Features**: Program cards, schedule, CTA

### Student Registration

**Route**: `/student-registration`
**Purpose**: Student enrollment form
**Features**: Form validation, auto-login, redirect to dashboard

### Student Dashboard

**Route**: `/student-dashboard`
**Purpose**: Student portal
**Features**: Student info, materials filtering, download simulation
**Protected**: Yes (requires student login)

### Materials Page

**Route**: `/materials`
**Purpose**: Browse learning materials
**Features**: Filtering, material cards, download simulation

### Volunteer Page

**Route**: `/volunteer`
**Purpose**: Volunteer application
**Features**: Benefits section, application form, validation

### Activities Page

**Route**: `/activities`
**Purpose**: View past activities
**Features**: Activity cards, type filtering

### Gallery Page

**Route**: `/gallery`
**Purpose**: Photo gallery
**Features**: Year filtering, placeholder images

### Contact Page

**Route**: `/contact`
**Purpose**: Contact information and form
**Features**: Contact form, info cards, social links

### Admin Login

**Route**: `/admin/login`
**Purpose**: Admin authentication
**Features**: Login form, demo credentials, error handling

### Admin Dashboard

**Route**: `/admin`
**Purpose**: Admin control panel
**Features**: Tabs, statistics, CRUD operations, modals
**Protected**: Yes (requires admin login)

---

## 🎨 CSS Architecture

### Global Styles

**File**: `src/index.css`
**Contains**:

- CSS variables for colors
- Reset styles
- Global typography
- Utility classes (.btn, .card, .form-input, etc.)
- Responsive breakpoints

### Component Styles

Each component has its own CSS file with:

- Component-specific styles
- BEM-like naming convention
- Responsive media queries
- Hover and focus states

### CSS Variables

```css
--bg-main: #0b141a --text-primary: #e9edef --text-secondary: #8696a0
  --text-muted: #667781 --whatsapp-green: #25d366 --unread-badge: #00a884
  --icon-default: #aebac1 --card-bg: #1a2730 --border-color: #2a3942;
```

---

## 🔐 Protected Routes

### Implementation

Protected routes check user authentication and role:

```jsx
// In component
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ProtectedPage = () => {
  const { user } = useApp();

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return <div>Protected Content</div>;
};
```

### Protected Pages:

- `/student-dashboard` - Requires student role
- `/admin` - Requires admin role

---

## 📱 Responsive Design

### Breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

### Mobile Features:

- Hamburger menu in Navbar
- Single column layouts
- Stacked grids
- Touch-friendly buttons
- Optimized font sizes

---

## 🔄 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Context Function (e.g., registerStudent)
    ↓
Update State
    ↓
Save to LocalStorage
    ↓
Re-render Components
    ↓
UI Updates
```

---

## 🛠️ Adding New Features

### Adding a New Page:

1. Create page component in `src/pages/`
2. Create corresponding CSS file
3. Add route in `src/App.jsx`
4. Add navigation link in `Navbar.jsx`

### Adding New State:

1. Add state variable in `AppContext.jsx`
2. Create CRUD functions
3. Add LocalStorage persistence
4. Export via context value

### Adding New Component:

1. Create component in `src/components/`
2. Create corresponding CSS file
3. Export component
4. Import and use in pages

---

## 📚 Best Practices Used

✅ Component composition
✅ Separation of concerns
✅ Reusable components
✅ Consistent naming conventions
✅ CSS modules approach
✅ Context for global state
✅ LocalStorage for persistence
✅ Form validation
✅ Error handling
✅ Responsive design
✅ Semantic HTML
✅ Accessibility considerations

---

## 🚀 Performance Considerations

- Minimal re-renders with Context API
- CSS-only animations
- Lazy loading ready (can add React.lazy)
- Optimized images (placeholders used)
- No unnecessary dependencies
- Clean component structure

---

## 🔧 Customization Guide

### Changing Colors:

Edit CSS variables in `src/index.css`

### Changing Layout:

Edit grid properties in component CSS files

### Adding New Fields:

1. Update form state
2. Add form input
3. Update validation
4. Update Context function
5. Update display components

### Modifying Mock Data:

Edit initial data in `src/context/AppContext.jsx`
