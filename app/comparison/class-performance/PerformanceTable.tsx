'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data for multiple students (using the same data as before)


export default function PerformanceTable({classData}: {classData: any[]}) {
  const subjectPerformance = useMemo(() => {
    const performance: { [key: string]: { name: string, averageTotal: number, averageInternal: number, averageExternal: number, count: number } } = {}
    classData.forEach(student => {
      Object.entries(student.Result).forEach(([code, subject]: [string, any]) => {
        if (!performance[code]) {
          performance[code] = {
            name: subject.name,
            averageTotal: 0,
            averageInternal: 0,
            averageExternal: 0,
            count: 0
          }
        }
        performance[code].averageTotal += parseInt(subject.total)
        performance[code].averageInternal += parseInt(subject.internal)
        performance[code].averageExternal += parseInt(subject.external)
        performance[code].count++
      })
    })

    Object.values(performance).forEach(subject => {
      subject.averageTotal = parseFloat((subject.averageTotal / subject.count).toFixed(2))
      subject.averageInternal = parseFloat((subject.averageInternal / subject.count).toFixed(2))
      subject.averageExternal = parseFloat((subject.averageExternal / subject.count).toFixed(2))
    })

    return Object.values(performance)
  }, [])

  const chartData = subjectPerformance.map(subject => ({
    name: subject.name.split(' ').slice(0, 3).join(' ') + '...',
    'Average Total': parseFloat(subject.averageTotal.toString()),
    'Average Internal': parseFloat(subject.averageInternal.toString()),
    'Average External': parseFloat(subject.averageExternal.toString())
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Class Subject Performance Comparison</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Subject Performance Chart</CardTitle>
          <CardDescription>Comparing average marks for all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Average Total" fill="#8884d8" />
                <Bar dataKey="Average Internal" fill="#82ca9d" />
                <Bar dataKey="Average External" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Subject Performance</CardTitle>
          <CardDescription>Breakdown of average performance for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%] ">
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Average Total</TableHead>
                <TableHead>Average Internal</TableHead>
                <TableHead>Average External</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectPerformance.map(subject => (
                <TableRow key={subject.name}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.averageTotal}</TableCell>
                  <TableCell>{subject.averageInternal}</TableCell>
                  <TableCell>{subject.averageExternal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

