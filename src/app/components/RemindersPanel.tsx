"use client"

import { Bell, Calendar, Heart, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface RemindersPanelProps {
  nextPeriod: number | null
  nextOvulation: number | null
}

export default function RemindersPanel({ nextPeriod, nextOvulation }: RemindersPanelProps) {
  const getUrgencyColor = (days: number | null) => {
    if (!days) return "bg-gray-100 text-gray-700"
    if (days <= 3) return "bg-red-100 text-red-700 border-red-200"
    if (days <= 7) return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-green-100 text-green-700 border-green-200"
  }

  const getUrgencyLabel = (days: number | null) => {
    if (!days) return "Sem previsão"
    if (days <= 3) return "Muito próximo"
    if (days <= 7) return "Próximo"
    return "Distante"
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-pink-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Bell className="w-5 h-5 text-pink-500" />
          Lembretes e Previsões
        </CardTitle>
        <CardDescription className="mt-1">
          Fique por dentro das próximas fases do seu ciclo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Period Reminder */}
        <div className="p-4 rounded-lg border-2 border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                <Calendar className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Próxima Menstruação</h3>
                <p className="text-sm text-gray-600">
                  {nextPeriod ? `Em ${nextPeriod} ${nextPeriod === 1 ? "dia" : "dias"}` : "Registre seu ciclo para previsões"}
                </p>
              </div>
            </div>
            {nextPeriod && (
              <Badge className={getUrgencyColor(nextPeriod)}>
                {getUrgencyLabel(nextPeriod)}
              </Badge>
            )}
          </div>
          {nextPeriod && nextPeriod <= 7 && (
            <Alert className="bg-pink-50 border-pink-200">
              <AlertCircle className="h-4 w-4 text-pink-600" />
              <AlertDescription className="text-sm text-pink-800">
                {nextPeriod <= 3
                  ? "Sua menstruação está chegando! Prepare-se com antecedência."
                  : "Sua menstruação está próxima. Considere ter produtos de higiene à mão."}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Ovulation Reminder */}
        <div className="p-4 rounded-lg border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                <Heart className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Próxima Ovulação</h3>
                <p className="text-sm text-gray-600">
                  {nextOvulation ? `Em ${nextOvulation} ${nextOvulation === 1 ? "dia" : "dias"}` : "Aguardando dados do ciclo"}
                </p>
              </div>
            </div>
            {nextOvulation && (
              <Badge className={getUrgencyColor(nextOvulation)}>
                {getUrgencyLabel(nextOvulation)}
              </Badge>
            )}
          </div>
          {nextOvulation && nextOvulation <= 7 && (
            <Alert className="bg-purple-50 border-purple-200">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-sm text-purple-800">
                {nextOvulation <= 3
                  ? "Você está no período fértil. Seu corpo pode apresentar mudanças."
                  : "Período fértil se aproximando. Você pode notar aumento de energia."}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Tips Section */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-500" />
            Dicas de Lembretes
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Mantenha seus registros atualizados para previsões mais precisas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Prepare-se com antecedência para evitar surpresas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Use os lembretes para planejar atividades e compromissos</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
