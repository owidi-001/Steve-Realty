'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  Home,
  Percent,
  Calendar,
  Download,
  RotateCcw,
  Calculator,
  Eye,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import MenuBar from '@/components/common/navbar'

interface MortgageInputs {
  propertyPrice: number
  downPayment: number
  interestRate: number
  loanTerm: number
}

interface MortgageResults {
  loanAmount: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  downPaymentPercent: number
}

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState<MortgageInputs>({
    propertyPrice: 10000000,
    downPayment: 2000000,
    interestRate: 10,
    loanTerm: 20,
  })

  const [showDetails, setShowDetails] = useState(true)

  // Local storage for recent calculations
  useEffect(() => {
    const saved = localStorage.getItem('mortgageCalculatorInputs')
    if (saved) {
      try {
        setInputs(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading saved inputs')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mortgageCalculatorInputs', JSON.stringify(inputs))
  }, [inputs])

  const results = useMemo((): MortgageResults => {
    const loanAmount = inputs.propertyPrice - inputs.downPayment
    const monthlyRate = inputs.interestRate / 100 / 12
    const numberOfPayments = inputs.loanTerm * 12

    let monthlyPayment = 0
    if (monthlyRate > 0) {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    } else {
      monthlyPayment = loanAmount / numberOfPayments
    }

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - loanAmount
    const downPaymentPercent = (inputs.downPayment / inputs.propertyPrice) * 100

    return {
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      downPaymentPercent,
    }
  }, [inputs])

  const handleInputChange = (key: keyof MortgageInputs, value: number) => {
    setInputs((prev) => {
      const newInputs = { ...prev, [key]: value }
      if (key === 'propertyPrice') {
        newInputs.downPayment = Math.min(newInputs.downPayment, newInputs.propertyPrice)
      }
      return newInputs
    })
  }

  const handleDownPaymentPercentage = (percent: number) => {
    const newDownPayment = (inputs.propertyPrice * percent) / 100
    setInputs((prev) => ({
      ...prev,
      downPayment: Math.round(newDownPayment),
    }))
  }

  const resetCalculator = () => {
    setInputs({
      propertyPrice: 10000000,
      downPayment: 2000000,
      interestRate: 10,
      loanTerm: 20,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCompact = (value: number) => {
    if (value >= 1000000) return `KES ${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `KES ${(value / 1000).toFixed(0)}K`
    return formatCurrency(value)
  }

  const downloadReport = () => {
    const reportContent = `
Mortgage Calculator Report
Property Price: ${formatCurrency(inputs.propertyPrice)}
Down Payment: ${formatCurrency(inputs.downPayment)} (${results.downPaymentPercent.toFixed(1)}%)
Loan Amount: ${formatCurrency(results.loanAmount)}
Interest Rate: ${inputs.interestRate}% per annum
Loan Term: ${inputs.loanTerm} years
Monthly Payment: ${formatCurrency(results.monthlyPayment)}
Total Payment: ${formatCurrency(results.totalPayment)}
Total Interest: ${formatCurrency(results.totalInterest)}
Generated: ${new Date().toLocaleDateString('en-KE')}
`
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mortgage-report.txt'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-background/50">
      <MenuBar />

      <div className="mx-auto container px-3 sm:px-4 py-4">
        {/* Header - Compact */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Mortgage Calculator
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Calculate your monthly payments and explore mortgage scenarios
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Input Section - Compact */}
          <Card className="p-4 sm:p-5 sticky top-4 border rounded-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Mortgage Details</h2>
            </div>
            {/* Disclaimer - Compact */}
            <div className="p-3 bg-slate-100 rounded border text-xs text-muted-foreground">
              <span className="font-semibold">Note:</span> Calculator provides estimates only. Actual payments may vary based on lender fees, insurance, and taxes.
            </div>

            {/* Property Price */}
            <div className='grid lg:grid-cols-2 gap-4 lg:gap-6'>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">
                  Property Price
                </label>
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="number"
                    value={inputs.propertyPrice}
                    onChange={(e) => handleInputChange('propertyPrice', Number(e.target.value))}
                    className="flex-1 px-3 py-2 border rounded-md outline-none focus:border-primary bg-background text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="500000000"
                  step="100000"
                  value={inputs.propertyPrice}
                  onChange={(e) => handleInputChange('propertyPrice', Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded accent-primary mb-1"
                />
                <div className="text-xs text-muted-foreground">{formatCompact(inputs.propertyPrice)}</div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">
                  Down Payment ({results.downPaymentPercent.toFixed(1)}%)
                </label>
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="number"
                    value={inputs.downPayment}
                    onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                    className="flex-1 px-3 py-2 border rounded-md outline-none focus:border-primary bg-background text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={inputs.propertyPrice}
                  step="100000"
                  value={inputs.downPayment}
                  onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded accent-primary mb-2"
                />
              </div>
            </div>

            <div className='grid lg:grid-cols-2 gap-4 lg:gap-6 mb-4'>
              {/* Interest Rate */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">
                  Interest Rate ({inputs.interestRate}%)
                </label>
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="number"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                    step="0.1"
                    className="flex-1 px-3 py-2 border rounded-md outline-none focus:border-primary bg-background text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.1"
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded accent-primary mb-1"
                />
              </div>

              {/* Loan Term */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">
                  Loan Term ({inputs.loanTerm} years)
                </label>
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="number"
                    value={inputs.loanTerm}
                    onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                    min="1"
                    max="50"
                    className="flex-1 px-3 py-2 border rounded-md outline-none focus:border-primary bg-background text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded accent-primary mb-1"
                />
              </div>

            </div>

            <Button
              onClick={resetCalculator}
              variant="outline"
              size="lg"
              className="border text-sm py-2"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset
            </Button>
          </Card>

          {/* Results Section - Compact */}
          <div className="lg:col-span-1 space-y-4">
            {/* Main Results - Compact */}
            <Card className="p-4 sm:p-5 border rounded-sm">
              <div>
                {/* Monthly Payment - Highlighted */}
                <div className="sm:col-span-2 bg-primary/5 p-4 rounded-sm border border-primary/20 mb-4">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                    Monthly Payment
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl sm:text-4xl font-bold text-primary">
                      {formatCompact(results.monthlyPayment)}
                    </p>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on {inputs.loanTerm}-year loan at {inputs.interestRate}% interest
                  </p>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-4 border rounded-sm">
                    <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                    <p className="text-xl font-bold text-foreground">{formatCompact(results.loanAmount)}</p>
                  </div>
                  <div className="p-4 border rounded-sm">
                    <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
                    <p className="text-xl font-bold text-emerald-600">{formatCompact(results.totalPayment)}</p>
                  </div>
                  <div className="p-4 border rounded-sm">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-xl font-bold text-amber-600">{formatCompact(results.totalInterest)}</p>
                  </div>
                  <div className="p-4 border rounded-sm">
                    <p className="text-xs text-muted-foreground mb-1">Down Payment</p>
                    <p className="text-xl font-bold text-purple-600">{results.downPaymentPercent.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Details Section */}
            <Card className="p-4 border rounded-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-foreground">Payment Details</h3>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-primary flex items-center gap-1"
                >
                  {showDetails ? 'Hide' : 'Show'}
                  <ChevronRight className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {showDetails && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Property Price</span>
                      <span className="font-semibold">{formatCurrency(inputs.propertyPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Down Payment</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(inputs.downPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-primary/5 p-2 rounded">
                      <span className="font-semibold">Loan Amount</span>
                      <span className="font-bold text-primary">{formatCurrency(results.loanAmount)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Monthly Payment</span>
                      <span className="font-semibold">{formatCurrency(results.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total Payments</span>
                      <span className="font-semibold">{inputs.loanTerm * 12}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-amber-600/5 p-2 rounded">
                      <span className="font-semibold">Total Interest</span>
                      <span className="font-bold text-amber-600">{formatCurrency(results.totalInterest)}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}