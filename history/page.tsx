'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { UsageRecord } from '../types'

export default function History() {
  const [usageHistory, setUsageHistory] = useState<UsageRecord[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem('usageHistory')
    if (storedHistory) {
      setUsageHistory(JSON.parse(storedHistory))
    }
  }, [])

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Tanggal,Slot Komputer,Durasi Awal (menit),Tambah Waktu (menit),Total Harga\n"
      + usageHistory.map(record => 
          `${record.date},${record.computerSlot},${record.initialDuration},${record.additionalTime},${record.totalPrice}`
        ).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "warnet_usage_history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Riwayat Penggunaan</h1>
        <div className="space-x-2">
          <Button onClick={exportData}>Export Data (CSV)</Button>
          <Link href="/dashboard">
            <Button variant="outline">Kembali ke Dashboard</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Slot Komputer</TableHead>
            <TableHead>Durasi Awal (menit)</TableHead>
            <TableHead>Tambah Waktu (menit)</TableHead>
            <TableHead>Total Harga</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageHistory.map(record => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.computerSlot}</TableCell>
              <TableCell>{record.initialDuration}</TableCell>
              <TableCell>{record.additionalTime}</TableCell>
              <TableCell>Rp {record.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

