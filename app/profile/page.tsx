'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserIcon, UploadIcon, CheckCircleIcon } from 'lucide-react'
import Link from 'next/link'

export default function Profile() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setResumeFile(event.target.files[0])
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link href="/" passHref>
          <Button variant="outline">Back to Job Board</Button>
        </Link>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserIcon className="mr-2 h-5 w-5" />
            Your Profile
          </CardTitle>
          <CardDescription>Manage your profile and upload your resume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" disabled />
          </div>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" />
          </div>
          <div>
            <Label htmlFor="resume">Resume</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="resume"
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <Button onClick={handleUploadClick} variant="outline">
                <UploadIcon className="mr-2 h-4 w-4" />
                {resumeFile ? 'Change Resume' : 'Upload Resume'}
              </Button>
              {resumeFile && (
                <span className="text-sm text-green-600 flex items-center">
                  <CheckCircleIcon className="mr-1 h-4 w-4" />
                  {resumeFile.name}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Profile</Button>
        </CardFooter>
      </Card>
    </div>
  )
}