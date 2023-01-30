import { useNavigate } from "react-router-dom"
import Table from "../../../components/section/Table"
import {observer} from 'mobx-react-lite'
import { useEffect } from "react"

import EventStore from "../../../viewmodels/Event/EventStore"
import TableEvent from "./TableEvent"
const eventStore = EventStore.getEventStore()

const Event = () => {
  const navigate = useNavigate() 

  useEffect(() => {      
    eventStore.getRequestEvents()
 }, [])

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Eventos</h2>
          <div className="ml-auto">
            <button onClick={() => navigate("/addEvent")} type="button" className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              Crear
            </button>
          </div>
        </div>
        <TableEvent list={eventStore.getEvents} headerList={['Título', 'Descripción', 'Precio de Reserva', 'Plazas', 'Capacidad', 'Localidad', 'Dirección', 'Operación']}/>
      </div>
    </>
  )
}
export default observer(Event)