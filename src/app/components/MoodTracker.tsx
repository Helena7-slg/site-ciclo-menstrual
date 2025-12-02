"use client"

import { useState } from "react"
import { Sun, Plus, Smile, Meh, Frown, Angry, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import type { Mood } from "../hooks/useCycleData"

interface MoodTrackerProps {
  moods: Mood[]
  onAddMood: (mood: Omit<Mood, "id">) => void
}

const MOOD_OPTIONS = [
  { value: "feliz", label: "Feliz", icon: Smile, color: "text-green-500" },
  { value: "calma", label: "Calma", icon: Heart, color: "text-blue-500" },
  { value: "neutra", label: "Neutra", icon: Meh, color: "text-gray-500" },
  { value: "triste", label: "Triste", icon: Frown, color: "text-yellow-500" },
  { value: "irritada", label: "Irritada", icon: Angry, color: "text-red-500" },
]

export default function MoodTracker({ moods, onAddMood }: MoodTrackerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedMood, setSelectedMood] = useState("")
  const [energy, setEnergy] = useState([5])
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !selectedMood) return

    onAddMood({
      date,
      mood: selectedMood,
      energy: energy[0],
      notes: notes || undefined,
    })

    // Reset form
    setDate(new Date().toISOString().split("T")[0])
    setSelectedMood("")
    setEnergy([5])
    setNotes("")
    setOpen(false)
  }

  const getMoodIcon = (moodValue: string) => {
    const mood = MOOD_OPTIONS.find((m) => m.value === moodValue)
    if (!mood) return null
    const Icon = mood.icon
    return <Icon className={`w-4 h-4 ${mood.color}`} />
  }

  const getMoodLabel = (moodValue: string) => {
    const mood = MOOD_OPTIONS.find((m) => m.value === moodValue)
    return mood?.label || moodValue
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
  }

  const getEnergyColor = (level: number) => {
    if (level <= 3) return "bg-red-100 text-red-700 border-red-200"
    if (level <= 6) return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-green-100 text-green-700 border-green-200"
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Sun className="w-5 h-5 text-blue-500" />
                Registro de Humor
              </CardTitle>
              <CardDescription className="mt-1">
                Acompanhe seu humor e níveis de energia
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Registrar Humor</DialogTitle>
                  <DialogDescription>
                    Como você está se sentindo hoje?
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
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Humor *</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {MOOD_OPTIONS.map((mood) => {
                        const Icon = mood.icon
                        return (
                          <button
                            key={mood.value}
                            type="button"
                            onClick={() => setSelectedMood(mood.value)}
                            className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                              selectedMood === mood.value
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${mood.color}`} />
                            <span className="text-xs text-gray-600">{mood.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="energy">Nível de Energia</Label>
                      <span className="text-sm font-medium text-blue-600">{energy[0]}/10</span>
                    </div>
                    <Slider
                      id="energy"
                      min={1}
                      max={10}
                      step={1}
                      value={energy}
                      onValueChange={setEnergy}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Baixa</span>
                      <span>Alta</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Como você está se sentindo hoje?"
                      className="border-blue-200 focus:border-blue-400 min-h-[80px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Salvar Humor
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {moods.length === 0 ? (
            <div className="text-center py-12">
              <Sun className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Nenhum registro de humor</p>
              <p className="text-sm text-gray-400">Comece a acompanhar como você se sente</p>
            </div>
          ) : (
            <div className="space-y-3">
              {moods.map((mood) => (
                <div
                  key={mood.id}
                  className="p-4 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getMoodIcon(mood.mood)}
                        <span className="font-medium text-gray-800">{getMoodLabel(mood.mood)}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">
                        {formatDate(mood.date)}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getEnergyColor(mood.energy)}`}>
                      Energia: {mood.energy}/10
                    </div>
                  </div>
                  {mood.notes && (
                    <p className="text-sm text-gray-600 mt-2 ml-6 italic">
                      {mood.notes}
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
