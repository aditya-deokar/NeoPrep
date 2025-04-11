"use client"

import type { IndustryData } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

type TrendsSectionProps = {
  data: IndustryData
}

export default function TrendsSection({ data }: TrendsSectionProps) {
  // Projected growth data (simulated)
  const growthData = [
    { year: 2022, market: 8.5, jobs: 7.2 },
    { year: 2023, market: 10.6, jobs: 9.1 },
    { year: 2024, market: 13.3, jobs: 11.4 },
    { year: 2025, market: 16.6, jobs: 14.3 },
    { year: 2026, market: 20.8, jobs: 17.9 },
    { year: 2027, market: 26.0, jobs: 22.4 },
  ]

  const chartConfig = {
    market: {
      label: "Market Size ($ Billion)",
      color: "hsl(var(--chart-1))",
    },
    jobs: {
      label: "Job Openings (100K)",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Growth Projections</CardTitle>
          <CardDescription>Projected growth of cloud computing in India</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="font-medium">{label}</div>
                            <div className="mt-1 grid grid-cols-1 gap-2">
                              <div className="text-xs">Market Size: ${payload[0].value} Billion</div>
                              <div className="text-xs">Job Openings: {payload[1].value}00K</div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="market"
                    name="Market Size ($ Billion)"
                    stroke="hsl(var(--chart-1))"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="jobs"
                    name="Job Openings (100K)"
                    stroke="hsl(var(--chart-2))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              The Indian cloud computing market is projected to grow at a CAGR of {data.growthRate}% through 2027,
              creating substantial job opportunities across various specializations.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>Emerging trends shaping cloud computing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.keyTrends.map((trend, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium">{trend}</p>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 &&
                        "Organizations are increasingly using multiple cloud providers for different services."}
                      {index === 1 &&
                        "Functions-as-a-Service (FaaS) is growing rapidly, eliminating infrastructure management."}
                      {index === 2 && "AI/ML services are becoming core offerings of all major cloud platforms."}
                      {index === 3 && "Security is becoming a primary focus area with specialized tools and practices."}
                      {index === 4 && "Cost optimization and management is emerging as a specialized discipline."}
                      {index === 5 && "Processing at the network edge complements centralized cloud computing."}
                      {index === 6 &&
                        "Internal developer platforms built on cloud infrastructure are gaining popularity."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Outlook</CardTitle>
            <CardDescription>Future prospects for cloud computing in India</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <p className="font-medium">Market Outlook: {data.marketOutlook}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                The cloud computing industry in India is experiencing robust growth driven by digital transformation
                initiatives across sectors, government cloud-first policies, and increasing adoption by SMEs.
              </p>

              <div className="space-y-2">
                <h3 className="font-medium">Key Growth Drivers</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium">Digital India Initiatives</p>
                    <p className="text-xs text-muted-foreground">
                      Government programs promoting digital infrastructure and services
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium">Remote Work Acceleration</p>
                    <p className="text-xs text-muted-foreground">
                      Permanent shift to hybrid work models requiring cloud solutions
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium">Data Localization</p>
                    <p className="text-xs text-muted-foreground">
                      Regulations driving cloud providers to establish local data centers
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-3">
                    <p className="font-medium">Startup Ecosystem</p>
                    <p className="text-xs text-muted-foreground">
                      Thriving startup culture leveraging cloud for rapid scaling
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Challenges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Talent Shortage</Badge>
                  <Badge variant="outline">Infrastructure Limitations</Badge>
                  <Badge variant="outline">Data Privacy Concerns</Badge>
                  <Badge variant="outline">Cost Management</Badge>
                  <Badge variant="outline">Legacy System Integration</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
