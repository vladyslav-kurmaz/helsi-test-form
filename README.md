# 📝 Test Assignment for Helsi

This project is a test assignment for **Helsi**.

The goal is to implement a large form using **different types of validation** (required fields, regex validation, dynamic conditions, custom messages, etc.).  
The form is built in sections (patient, contacts, documents), with support for dynamic field state management.

---

## 🛠️ Technologies

- ⚙️ **TypeScript** – type safety
- 🎨 **Ant Design** – UI library
- 🔁 **Final Form** – form state management
- ⚡️ **Vite** – fast build and development tool

---

## 🔄 Updates in Review Branch

### Fixes and Improvements

1. 🔧 **Form Validation**

   - Improved handling of optional fields
   - Added correct phone validation with empty value support
   - Optimized Yup validation schemas

2. 🎛️ **SwitchField Component**

   - Redesigned architecture for better state synchronization
   - Split into two components for better lifecycle management
   - Fixed React Hooks issues
   - Improved props typing

3. 🔄 **State Synchronization**
   - Optimized interaction between Final Form and local state
   - Improved initial values handling
   - Added correct switch state change handling

---

## ▶️ Project Setup

> **Requirements:** Node.js version **18 or higher**

### Installing Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install

# 🔧 Run in development mode
npm run dev
# or
yarn dev
# or
pnpm dev

# 🛠 Build for production
npm run build
# or
yarn build
# or
pnpm build

# 👀 Preview production build locally
npm run preview
# or
yarn preview
# or
pnpm preview
```
