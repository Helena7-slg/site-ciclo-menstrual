"use client"

import { useState } from "react"
import { Calendar, Plus, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Cycle } from "../hooks/useCycleData"

interface CycleTrackerProps {
  cycles: Cycle[]
  onAddCycle: (cycle: Omit<Cycle, "id">) => void
}

export default function CycleTracker({ cycles, onAddCycle }: CycleTrackerProps) {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [flow, setFlow] = useState<"light" | "medium" | "heavy">("medium")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!startDate) return

    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : undefined
    const duration = end ? Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) : 0

    onAddCycle({
      startDate,
      endDate: endDate || undefined,
      duration,
      flow,
      notes: notes || undefined,
    })

    // Reset form
    setStartDate("")
    setEndDate("")
    setFlow("medium")
    setNotes("")
    setOpen(false)
  }

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case "light":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "medium":
        return "bg-pink-300 text-pink-900 border-pink-400"
      case "heavy":
        return "bg-pink-500 text-white border-pink-600"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm border-pink-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5 text-pink-500" />
                Registro de Ciclos
              </CardTitle>
              <CardDescription className="mt-1">
                Acompanhe seus ciclos menstruais e identifique padrões
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Ciclo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Registrar Novo Ciclo</DialogTitle>
                  <DialogDescription>
                    Adicione informações sobre seu ciclo menstrual
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Término (opcional)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flow">Intensidade do Fluxo</Label>
                    <Select value={flow} onValueChange={(value: any) => setFlow(value)}>
                      <SelectTrigger className="border-pink-200 focus:border-pink-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Leve</SelectItem>
                        <SelectItem value="medium">Moderado</SelectItem>
                        <SelectItem value="heavy">Intenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Adicione notas sobre este ciclo..."
                      className="border-pink-200 focus:border-pink-400 min-h-[80px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Salvar Ciclo
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {cycles.length === 0 ? (
            <div className="text-center py-12">
              <Droplet className="w-12 h-12 text-pink-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Nenhum ciclo registrado ainda</p>
              <p className="text-sm text-gray-400">Comece registrando seu primeiro ciclo</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cycles.map((cycle) => (
                <div
                  key={cycle.id}
                  className="p-4 rounded-lg border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-pink-500" />
                        <span className="font-medium text-gray-800">
                          {formatDate(cycle.startDate)}
                          {cycle.endDate && ` - ${formatDate(cycle.endDate)}`}
                        </span>
                      </div>
                      {cycle.duration > 0 && (
                        <p className="text-sm text-gray-600 ml-6">
                          Duração: {cycle.duration} {cycle.duration === 1 ? "dia" : "dias"}
                        </p>
                      )}
                    </div>
                    <Badge className={getFlowColor(cycle.flow)}>
                      {cycle.flow === "light" && "Leve"}
                      {cycle.flow === "medium" && "Moderado"}
                      {cycle.flow === "heavy" && "Intenso"}
                    </Badge>
                  </div>
                  {cycle.notes && (
                    <p className="text-sm text-gray-600 mt-2 ml-6 italic">
                      {cycle.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
