import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Personas } from './pages/Personas'
import { Profile } from './pages/Profile'
import { Chat } from './pages/Chat'
//import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

//const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-screen">{children}</div>
}

function App() {

  const routes = [
    { path: '/chat/:id', component: (<Chat />) },
    { path: '/chat', component: React.createElement(ChatRedirect) },
    { path: '/chat/:persona/:id', component: (<Chat />) },
    { path: '/chat/:persona', component: React.createElement(ChatRedirect) },
    { path: '/personas', component: (<Personas />) },
    { path: '/profile', component: (<Profile />) },
    { path: '/', component: React.createElement(Home) }
  ]

  return (
    <>
      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route
            key={index}
            path={path}
            element={<Layout>{(component)}</Layout>}
          />
        ))}
      </Routes>
    </>
  )
}

export default App

function ChatRedirect(persona?: string) {
  const newId = Math.random().toString(36).substring(2)
  useEffect(() => {
    if (persona === undefined) {
      window.location.href = `/chat/${newId}`
    } else {
      window.location.href = `/chat/${persona}/${newId}`
    }
  }, [])
}

/*
function LoggedIn({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <h2>  Login</h2>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}
*/
