"use client"

import { useState } from "react"
import { Droplets, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Symptom } from "../hooks/useCycleData"

interface SymptomsLoggerProps {
  symptoms: Symptom[]
  onAddSymptom: (symptom: Omit<Symptom, "id">) => void
}

const SYMPTOM_TYPES = [
  "Cólicas",
  "Dor de cabeça",
  "Náusea",
  "Inchaço",
  "Sensibilidade nos seios",
  "Fadiga",
  "Dor nas costas",
  "Acne",
  "Insônia",
  "Outro",
]

export default function SymptomsLogger({ symptoms, onAddSymptom }: SymptomsLoggerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [type, setType] = useState("")
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !type) return

    onAddSymptom({
      date,
      type,
      severity,
      notes: notes || undefined,
    })

    // Reset form
    setDate(new Date().toISOString().split("T")[0])
    setType("")
    setSeverity("moderate")
    setNotes("")
    setOpen(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-700 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "severe":
        return "bg-red-100 text-red-700 border-red-200"
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
      <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Droplets className="w-5 h-5 text-purple-500" />
                Registro de Sintomas
              </CardTitle>
              <CardDescription className="mt-1">
                Monitore sintomas físicos ao longo do ciclo
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Registrar Sintoma</DialogTitle>
                  <DialogDescription>
                    Adicione informações sobre sintomas físicos
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Sintoma *</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger className="border-purple-200 focus:border-purple-400">
                        <SelectValue placeholder="Selecione um sintoma" />
                      </SelectTrigger>
                      <SelectContent>
                        {SYMPTOM_TYPES.map((symptomType) => (
                          <SelectItem key={symptomType} value={symptomType}>
                            {symptomType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Intensidade</Label>
                    <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                      <SelectTrigger className="border-purple-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Leve</SelectItem>
                        <SelectItem value="moderate">Moderada</SelectItem>
                        <SelectItem value="severe">Severa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Adicione detalhes sobre o sintoma..."
                      className="border-purple-200 focus:border-purple-400 min-h-[80px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Salvar Sintoma
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {symptoms.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-purple-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Nenhum sintoma registrado</p>
              <p className="text-sm text-gray-400">Comece a monitorar seus sintomas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="p-4 rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="w-4 h-4 text-purple-500" />
                        <span className="font-medium text-gray-800">{symptom.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        {formatDate(symptom.date)}
                      </p>
                    </div>
                    <Badge className={getSeverityColor(symptom.severity)}>
                      {symptom.severity === "mild" && "Leve"}
                      {symptom.severity === "moderate" && "Moderada"}
                      {symptom.severity === "severe" && "Severa"}
                    </Badge>
                  </div>
                  {symptom.notes && (
                    <p className="text-sm text-gray-600 mt-2 ml-6 italic">
                      {symptom.notes}
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
