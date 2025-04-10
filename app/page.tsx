import { redirect } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  // Check if user is authenticated (would use a real auth check in production)
  const isAuthenticated = false

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">StudyAI</h1>
          <p className="mt-2 text-muted-foreground">Your AI-powered study assistant</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
