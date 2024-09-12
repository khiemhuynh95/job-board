'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BriefcaseIcon, CheckCircleIcon, LogOutIcon, MapPinIcon, BuildingIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

// Mock data for jobs (unchanged)
const jobs = [
  { 
    id: 1, 
    title: "Frontend Developer", 
    company: "TechCorp", 
    location: "Remote", 
    description: "We're looking for a skilled frontend developer to join our team.", 
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with UX designers to implement intuitive user interfaces",
      "Optimize applications for maximum speed and scalability",
    ],
    requirements: [
      "3+ years of experience with React and modern JavaScript",
      "Strong understanding of web technologies and best practices",
      "Experience with state management libraries (e.g., Redux, MobX)",
    ],
    salary: "$80,000 - $120,000",
    postedDate: "2023-05-15",
  },
  { 
    id: 2, 
    title: "UX Designer", 
    company: "DesignHub", 
    location: "New York, NY", 
    description: "Join our creative team as a UX designer and shape the future of our products.", 
    responsibilities: [
      "Create user-centered designs by understanding business requirements",
      "Develop wireframes, prototypes, and user flows",
      "Conduct user research and usability testing",
    ],
    requirements: [
      "4+ years of UX design experience",
      "Proficiency in design tools such as Figma or Sketch",
      "Strong portfolio demonstrating your design process",
    ],
    salary: "$90,000 - $130,000",
    postedDate: "2023-05-10",
  },
  { 
    id: 3, 
    title: "Full Stack Engineer", 
    company: "WebSolutions", 
    location: "San Francisco, CA", 
    description: "Seeking a versatile full stack engineer to work on exciting projects.", 
    responsibilities: [
      "Develop and maintain web applications using modern frameworks",
      "Design and implement RESTful APIs",
      "Optimize database queries and application performance",
    ],
    requirements: [
      "5+ years of full stack development experience",
      "Proficiency in JavaScript, Python, and SQL",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
    ],
    salary: "$100,000 - $150,000",
    postedDate: "2023-05-12",
  },
  { 
    id: 4, 
    title: "Data Scientist", 
    company: "DataMinds", 
    location: "Boston, MA", 
    description: "Help us unlock insights from complex datasets as a data scientist.", 
    responsibilities: [
      "Develop machine learning models to solve business problems",
      "Analyze large datasets and extract meaningful insights",
      "Collaborate with cross-functional teams to implement data-driven solutions",
    ],
    requirements: [
      "Master's or PhD in Computer Science, Statistics, or related field",
      "Strong programming skills in Python and R",
      "Experience with machine learning libraries (e.g., TensorFlow, PyTorch)",
    ],
    salary: "$110,000 - $160,000",
    postedDate: "2023-05-08",
  },
  { 
    id: 5, 
    title: "DevOps Engineer", 
    company: "CloudOps", 
    location: "Remote", 
    description: "Join our DevOps team to streamline our infrastructure and deployment processes.", 
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage and optimize cloud infrastructure",
      "Implement security best practices and monitor system performance",
    ],
    requirements: [
      "4+ years of experience in DevOps or SRE roles",
      "Strong knowledge of cloud platforms (AWS, GCP, or Azure)",
      "Experience with containerization and orchestration (Docker, Kubernetes)",
    ],
    salary: "$95,000 - $140,000",
    postedDate: "2023-05-14",
  },
]

export function JobBoardComponent() {
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [tempEmail, setTempEmail] = useState('')
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null)

  const handleOpenJobModal = (job: typeof jobs[0]) => {
    setSelectedJob(job)
    setIsJobModalOpen(true)
  }

  const handleApply = () => {
    if (userEmail && selectedJob) {
      setAppliedJobs([...appliedJobs, selectedJob.id])
      setIsJobModalOpen(false)
    } else {
      setIsLoginModalOpen(true)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setUserEmail(tempEmail)
    setIsLoginModalOpen(false)
    if (selectedJob) {
      setAppliedJobs([...appliedJobs, selectedJob.id])
      setIsJobModalOpen(false)
    }
  }

  const handleLogout = () => {
    setUserEmail(null)
    setAppliedJobs([])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Board</h1>
        {userEmail ? (
          <div className="flex items-center space-x-4">
            <Link href="/profile" passHref>
              <Button variant="outline">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            <span>{userEmail}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
        )}
      </div>
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BriefcaseIcon className="mr-2 h-5 w-5" />
                  {job.title}
                </CardTitle>
                <CardDescription>{job.company} - {job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{job.description}</p>
              </CardContent>
              <CardFooter>
                {appliedJobs.includes(job.id) ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="mr-2 h-5 w-5" />
                    Applied
                  </div>
                ) : (
                  <Button onClick={() => handleOpenJobModal(job)}>View Details & Apply</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <form onSubmit={handleLogin}>
            <DialogHeader>
              <DialogTitle>Login to Apply</DialogTitle>
              <DialogDescription>
                Enter your email to login and apply for the job.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Login & Apply</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
        <DialogContent className="max-w-3xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center mt-2">
                    <BuildingIcon className="mr-2 h-4 w-4" />
                    {selectedJob.company}
                  </div>
                  <div className="flex items-center mt-1">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    {selectedJob.location}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="mb-4">{selectedJob.description}</p>
                <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <div>
                    <strong>Salary Range:</strong> {selectedJob.salary}
                  </div>
                  <div>
                    <strong>Posted Date:</strong> {selectedJob.postedDate}
                  </div>
                </div>
              </div>
              <DialogFooter>
                {appliedJobs.includes(selectedJob.id) ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="mr-2 h-5 w-5" />
                    Applied
                  </div>
                ) : (
                  <Button onClick={handleApply}>Apply Now</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}