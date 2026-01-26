'use client'

import { useState } from 'react'
import { 
  User, Mail, Phone, MapPin, Briefcase, Award, Upload, 
  CheckCircle, Shield, Users, TrendingUp, DollarSign,
  Star, Clock, FileText, Calendar, Building2, Sparkles,
  ArrowRight, Check, X, HelpCircle, ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const BENEFITS = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'High Earning Potential',
    description: 'Uncapped commission structure with average earnings of KES 500K+ per month'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Career Growth',
    description: 'Clear progression path from Junior Agent to Senior Partner'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Company Support',
    description: 'Marketing resources, legal support, and lead generation'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Collaboration',
    description: 'Work with Kenya\'s top real estate professionals'
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Premium Listings',
    description: 'Access to exclusive luxury and commercial properties'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Training & Certification',
    description: 'Comprehensive training program and industry certifications'
  }
]

const REQUIREMENTS = [
  'Minimum 21 years of age',
  'Valid Kenyan National ID',
  'Degree or Diploma in any field',
  'Excellent communication skills',
  'Passion for real estate',
  'Willingness to learn',
  'Clean criminal record',
  'Basic computer skills'
]

const STEPS = [
  { number: 1, title: 'Application', description: 'Submit your details and documents' },
  { number: 2, title: 'Screening', description: 'Background check and initial interview' },
  { number: 3, title: 'Training', description: 'Complete our certification program' },
  { number: 4, title: 'Onboarding', description: 'Get your tools and start selling' }
]

const TESTIMONIALS = [
  {
    name: 'John Kamau',
    role: 'Senior Property Consultant',
    quote: 'Joining this team was the best career decision I ever made. The support and training transformed me into a top performer.',
    earnings: 'KES 850M+ in sales',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Sarah Mwangi',
    role: 'Residential Specialist',
    quote: 'As a former teacher, I never imagined earning this much. The training program made all the difference.',
    earnings: 'KES 450M+ in sales',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop'
  },
  {
    name: 'Michael Ochieng',
    role: 'Commercial Expert',
    quote: 'The company provides everything you need to succeed - from marketing to legal support.',
    earnings: 'KES 680M+ in sales',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  }
]

export default function BecomeAgentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    education: '',
    currentOccupation: '',
    motivation: '',
    referral: '',
    resume: null as File | null,
    idDocument: null as File | null,
    certificates: null as File | null,
    termsAccepted: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, [field]: file }))
    
    // Simulate upload progress
    if (file) {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 100)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="mb-2 block">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="mb-2 block">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-2 block">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 700 123 456"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="location" className="mb-2 block">
                Current Location *
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Nairobi, Westlands"
                required
              />
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="experience" className="mb-2 block">
                Real Estate Experience
              </Label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full px-4 py-3 bg-muted border-0 rounded-sm text-foreground text-sm outline-none transition-colors hover:bg-muted/80"
              >
                <option value="">Select experience level</option>
                <option value="none">No experience</option>
                <option value="less-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="education" className="mb-2 block">
                Highest Education Level *
              </Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="e.g., Bachelor's Degree in Business"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="currentOccupation" className="mb-2 block">
                Current Occupation
              </Label>
              <Input
                id="currentOccupation"
                name="currentOccupation"
                value={formData.currentOccupation}
                onChange={handleInputChange}
                placeholder="e.g., Sales Manager"
              />
            </div>
            
            <div>
              <Label htmlFor="motivation" className="mb-2 block">
                Why do you want to become a real estate agent? *
              </Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Tell us about your passion for real estate and what drives you..."
                rows={4}
                required
              />
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="mb-4 block text-sm font-semibold text-foreground">
                Upload Required Documents
              </Label>
              
              <div className="space-y-4">
                {/* Resume/CV */}
                <div className="border border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="resume" className="block font-medium text-foreground mb-1">
                        Resume or CV *
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                      {formData.resume ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{formData.resume.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, 'resume')}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* ID Document */}
                <div className="border border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="idDocument" className="block font-medium text-foreground mb-1">
                        National ID / Passport *
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        PDF, JPG, PNG (Max 5MB)
                      </p>
                      {formData.idDocument ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{formData.idDocument.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, idDocument: null }))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Input
                          id="idDocument"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'idDocument')}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Certificates */}
                <div className="border border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="certificates" className="block font-medium text-foreground mb-1">
                        Certificates (Optional)
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Any relevant certificates or diplomas
                      </p>
                      {formData.certificates ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{formData.certificates.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, certificates: null }))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Input
                          id="certificates"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'certificates')}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-foreground">Terms & Conditions</h3>
              </div>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>By submitting this application, you agree to:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Undergo a background check and screening process</li>
                  <li>Complete our mandatory training program</li>
                  <li>Adhere to our code of ethics and professional standards</li>
                  <li>Maintain confidentiality of client information</li>
                  <li>Follow company policies and procedures</li>
                  <li>Work under our commission structure agreement</li>
                </ul>
                
                <div className="pt-4 border-t border-border">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      required
                    />
                    <span className="text-sm">
                      I have read and agree to the terms and conditions, privacy policy, and commission structure agreement.
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="referral" className="mb-2 block">
                Referral Code (Optional)
              </Label>
              <Input
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleInputChange}
                placeholder="Enter referral code if any"
              />
              <p className="text-xs text-muted-foreground mt-2">
                If someone referred you, enter their code here.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">What happens next?</p>
                  <p className="text-sm text-green-700 mt-1">
                    Our team will review your application within 2-3 business days and contact you for the next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Join Our Elite Team
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Become a <span className="text-primary">Real Estate Agent</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your rewarding career in real estate with Kenya's leading property agency. 
              Earn unlimited income while helping people find their dream homes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="#application">
                  Start Application
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#benefits">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Join Our Team?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your real estate career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-16 bg-muted/30">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Who We're Looking For
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                You don't need prior real estate experience. We're looking for motivated individuals with:
              </p>
              
              <div className="space-y-4">
                {REQUIREMENTS.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Our Success Rate
                  </h3>
                  <p className="text-muted-foreground">
                    85% of our new agents exceed their income targets within 6 months
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Average Monthly Income</span>
                    <span className="font-bold text-primary">KES 500K+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Training Success Rate</span>
                    <span className="font-bold text-primary">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Agent Satisfaction</span>
                    <span className="font-bold text-primary">96%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Career Growth</span>
                    <span className="font-bold text-primary">2.5x Industry Avg</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From application to your first sale in just 30 days
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {STEPS.map((step) => (
              <div key={step.number} className="relative">
                <Card className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <span className="font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="application" className="py-16 bg-muted/30">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for applying to become a real estate agent with us. Our team will review your application and contact you within 2-3 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/agents">
                    Meet Our Agents
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">
                    Return to Home
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Card className="max-w-4xl mx-auto overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-muted border-b border-border p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Step {currentStep} of 4
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((currentStep / 4) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(currentStep / 4) * 100} className="h-2" />
              </div>
              
              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {currentStep === 1 && 'Personal Information'}
                    {currentStep === 2 && 'Professional Background'}
                    {currentStep === 3 && 'Document Upload'}
                    {currentStep === 4 && 'Final Steps'}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentStep === 1 && 'Tell us about yourself'}
                    {currentStep === 2 && 'Share your background and motivation'}
                    {currentStep === 3 && 'Upload required documents'}
                    {currentStep === 4 && 'Review and submit your application'}
                  </p>
                </div>
                
                {renderStep()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 mt-8 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.termsAccepted}
                      className="gap-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      {!isSubmitting && <Check className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from some of our top-performing agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium">{testimonial.earnings}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-muted/30">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about becoming an agent
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Do I need real estate experience?',
                answer: 'No prior experience is required. We provide comprehensive training to all new agents, covering everything from property laws to sales techniques.'
              },
              {
                question: 'What is the commission structure?',
                answer: 'We offer one of the most competitive commission structures in Kenya, starting at 70% for new agents and going up to 90% for top performers.'
              },
              {
                question: 'How long does training take?',
                answer: 'Our certification program takes 2-3 weeks, followed by on-the-job mentorship. Most agents are ready to start selling within 30 days.'
              },
              {
                question: 'Is there a salary or just commission?',
                answer: 'We offer a competitive draw against commission during the first 3 months to help you get started. After that, it\'s 100% commission-based with unlimited earning potential.'
              },
              {
                question: 'What support will I receive?',
                answer: 'You\'ll receive marketing materials, lead generation support, legal assistance, mentorship from senior agents, and access to our exclusive property listings.'
              },
              {
                question: 'When will I hear back after applying?',
                answer: 'Our team reviews applications within 2-3 business days. If shortlisted, we\'ll contact you to schedule an interview.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/contact">
                Contact Our Recruitment Team
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary to-primary/90">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Real Estate Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join Kenya's fastest-growing real estate team and unlock your earning potential.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link href="#application">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}