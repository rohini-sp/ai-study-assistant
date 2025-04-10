"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [subject, setSubject] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !subject) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      setIsProcessing(true)

      // Simulate AI processing delay
      setTimeout(() => {
        setIsProcessing(false)
        setUploadComplete(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setFile(null)
          setSubject("")
          setUploadComplete(false)
        }, 3000)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Study Notes</h1>
        <p className="text-muted-foreground mt-2">Upload your lecture notes to generate AI summaries and flashcards</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleUpload}>
          <CardHeader>
            <CardTitle>Upload Notes</CardTitle>
            <CardDescription>Upload .txt or .pdf files to generate AI-powered study materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here or click to browse</p>
                <p className="text-xs text-muted-foreground mb-4">Supports .txt and .pdf files up to 10MB</p>
                <Input
                  id="file"
                  type="file"
                  accept=".txt,.pdf"
                  onChange={handleFileChange}
                  className="max-w-xs"
                  required
                />
                {file && (
                  <p className="text-sm mt-2">
                    Selected: <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>
            </div>

            {uploadComplete && (
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                <FileUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Upload Complete!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Your notes have been processed. AI-generated summaries and flashcards are now available in your
                  subject progress section.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={!file || !subject || isUploading || isProcessing || uploadComplete}
              className="w-full"
            >
              {isUploading && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              )}
              {isProcessing && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing with AI...
                </>
              )}
              {!isUploading && !isProcessing && !uploadComplete && "Upload and Process"}
              {uploadComplete && "Upload Complete!"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
