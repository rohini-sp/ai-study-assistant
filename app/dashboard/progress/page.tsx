"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, BookOpen, FileText } from "lucide-react"

// Sample data for the subjects
const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    uploads: 3,
    flashcards: [
      { id: "fc-math-1", question: "What is the derivative of e^x?", answer: "e^x" },
      { id: "fc-math-2", question: "What is the integral of 1/x?", answer: "ln|x| + C" },
      { id: "fc-math-3", question: "What is the formula for the area of a circle?", answer: "πr²" },
      { id: "fc-math-4", question: "What is the Pythagorean theorem?", answer: "a² + b² = c²" },
    ],
    lastUpdated: "2 weeks ago",
    summaries: [
      {
        id: "math-1",
        title: "Calculus - Integration Methods",
        date: "2 weeks ago",
        content:
          "Integration is the process of finding the antiderivative of a function. Key methods include substitution, integration by parts, and partial fractions. The fundamental theorem of calculus connects differentiation and integration.",
      },
      {
        id: "math-2",
        title: "Linear Algebra - Matrices",
        date: "3 weeks ago",
        content:
          "Matrices are rectangular arrays of numbers. Operations include addition, subtraction, and multiplication. The determinant of a matrix determines if it's invertible. Eigenvalues and eigenvectors are important for understanding linear transformations.",
      },
      {
        id: "math-3",
        title: "Statistics - Probability Distributions",
        date: "1 month ago",
        content:
          "Probability distributions describe the likelihood of outcomes. Common distributions include normal, binomial, and Poisson. The central limit theorem states that the sampling distribution of the mean approaches a normal distribution as sample size increases.",
      },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    uploads: 4,
    flashcards: [
      {
        id: "fc-physics-1",
        question: "What is Newton's first law?",
        answer:
          "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      },
      {
        id: "fc-physics-2",
        question: "What is the formula for force?",
        answer: "F = ma (Force equals mass times acceleration)",
      },
      {
        id: "fc-physics-3",
        question: "What is the speed of light in vacuum?",
        answer: "299,792,458 meters per second",
      },
    ],
    lastUpdated: "2 days ago",
    summaries: [
      {
        id: "physics-1",
        title: "Quantum Mechanics",
        date: "2 days ago",
        content:
          "Quantum mechanics describes the behavior of matter and energy at the atomic and subatomic levels. Key concepts include wave-particle duality, uncertainty principle, and quantum entanglement. The Schrödinger equation is the fundamental equation of quantum mechanics.",
      },
      {
        id: "physics-2",
        title: "Thermodynamics",
        date: "1 week ago",
        content:
          "Thermodynamics is the study of heat, work, and energy. The first law states that energy cannot be created or destroyed. The second law introduces the concept of entropy, which always increases in an isolated system. The third law states that entropy approaches a constant as temperature approaches absolute zero.",
      },
    ],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    uploads: 2,
    flashcards: [
      { id: "fc-cs-1", question: "What is the time complexity of binary search?", answer: "O(log n)" },
      {
        id: "fc-cs-2",
        question: "What is a hash table?",
        answer: "A data structure that maps keys to values using a hash function",
      },
      {
        id: "fc-cs-3",
        question: "What is recursion?",
        answer: "A programming technique where a function calls itself",
      },
    ],
    lastUpdated: "1 week ago",
    summaries: [
      {
        id: "cs-1",
        title: "Data Structures - Trees",
        date: "1 week ago",
        content:
          "Trees are hierarchical data structures with a root node and child nodes. Binary trees have at most two children per node. Binary search trees maintain the property that left children are less than the parent and right children are greater. Balanced trees like AVL and Red-Black trees ensure O(log n) operations.",
      },
      {
        id: "cs-2",
        title: "Algorithms - Sorting",
        date: "2 weeks ago",
        content:
          "Sorting algorithms arrange elements in a specific order. Common algorithms include bubble sort (O(n²)), merge sort (O(n log n)), and quicksort (average O(n log n)). The choice of algorithm depends on the data size, initial order, and memory constraints.",
      },
    ],
  },
]

export default function ProgressPage() {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Record<string, string>>({})

  const toggleExpand = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId)
    if (!activeTab[subjectId]) {
      setActiveTab({ ...activeTab, [subjectId]: "summaries" })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subject Progress</h1>
        <p className="text-muted-foreground mt-2">Track your learning progress across different subjects</p>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <Card key={subject.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => toggleExpand(subject.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {subject.uploads} uploads · {subject.flashcards.length} flashcards · Last updated{" "}
                    {subject.lastUpdated}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                {expandedSubject === subject.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>

            {expandedSubject === subject.id && (
              <div className="px-6 pb-6">
                <Tabs
                  value={activeTab[subject.id] || "summaries"}
                  onValueChange={(value) => setActiveTab({ ...activeTab, [subject.id]: value })}
                >
                  <TabsList className="mb-4">
                    <TabsTrigger value="summaries">AI Summaries</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summaries" className="space-y-4">
                    {subject.summaries.map((summary) => (
                      <Card key={summary.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <CardTitle className="text-base">{summary.title}</CardTitle>
                          </div>
                          <CardDescription>{summary.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{summary.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="flashcards">
                    <div className="grid gap-4 md:grid-cols-2">
                      {subject.flashcards.map((flashcard) => (
                        <Card key={flashcard.id} className="overflow-hidden">
                          <div className="bg-primary/5 p-4">
                            <h4 className="font-medium">Question:</h4>
                            <p>{flashcard.question}</p>
                          </div>
                          <div className="p-4 border-t">
                            <h4 className="font-medium">Answer:</h4>
                            <p>{flashcard.answer}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
