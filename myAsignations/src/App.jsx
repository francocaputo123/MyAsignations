import { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [legajo, setLegajo] = useState({ legajo: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLegajo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.get(
        `http://localhost:3001/api/asignaciones/${legajo.legajo}`
      )
      setData(res.data)
      setError("")
    } catch (err) {
      setError("Error al consultar el servidor")
      setData(null)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center px-4">

      <h1 className="text-3xl font-bold text-blue-700 my-10">
        A laburar
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
      >
        <label
          htmlFor="legajo"
          className="text-sm font-medium text-slate-600"
        >
          Ingrese su legajo
        </label>

        <input
          type="text"
          name="legajo"
          value={legajo.legajo}
          onChange={handleChange}
          placeholder="Ej: 12345"
          className="rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="mt-2 rounded-xl bg-blue-600 py-2 text-white font-semibold hover:bg-blue-500 transition"
        >
          Consultar
        </button>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
      </form>

      {data && (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mt-8">

          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Resultado de la consulta
          </h2>

          <div className="text-slate-700 space-y-1 mb-4">
            <p><span className="font-medium">Legajo:</span> {data.legajo}</p>
            <p><span className="font-medium">Fecha de consulta:</span> {data.fechaConsulta}</p>
          </div>

          <h3 className="font-semibold text-blue-600 mb-2">
            Asignaciones
          </h3>

          {data.asignaciones.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {data.asignaciones.map(asig => (
                <div
                  key={asig.fecha}
                  className="rounded-xl border border-blue-100 p-4 bg-slate-50"
                >
                  <p className="text-sm text-slate-500">
                    Fecha
                  </p>
                  <p className="font-medium mb-2">
                    {asig.fecha}
                  </p>

                  <p className="text-sm">
                    <span className="font-medium">Entrada:</span> {asig.horaEntrada}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Salida:</span> {asig.horaSalida}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              Este legajo no existe o no tiene asignaciones
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
