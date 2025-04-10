import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, FileText, GraduationCap, Mail, User } from "lucide-react"

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: "Student User",
    email: "student@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    totalNotes: 9,
    subjectsCovered: ["Mathematics", "Physics", "Computer Science"],
    joinDate: "January 2023",
    recentActivity: [
      { action: "Uploaded notes", subject: "Physics", date: "2 days ago" },
      { action: "Generated flashcards", subject: "Mathematics", date: "5 days ago" },
      { action: "Reviewed summary", subject: "Computer Science", date: "1 week ago" },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account and view your study statistics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-medium">{user.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                  {user.email}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Member since {user.joinDate}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {user.subjectsCovered.map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Statistics</CardTitle>
            <CardDescription>Your learning progress at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{user.totalNotes}</div>
                <p className="text-sm text-muted-foreground">Notes Uploaded</p>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">{user.subjectsCovered.length}</div>
                <p className="text-sm text-muted-foreground">Subjects Covered</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
              <div className="space-y-3">
                {user.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.subject} · {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Journey</CardTitle>
          <CardDescription>Your progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-center">
              <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Learning progress visualization will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
