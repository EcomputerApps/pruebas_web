import { observer } from 'mobx-react-lite'
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import EventStore from "../../../viewmodels/Event/EventStore"
import TableEvent from "./TableEvent"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import { ToastContainer } from "react-toastify"
import CreateEvent from "./create/CreateEvent"
import { CSVLink } from 'react-csv';
const eventStore = EventStore.getEventStore()

const Event = () => {
  const headers = [
    { label: 'Título', key: 'title' },
    { label: 'Descripción', key: 'description' },
    { label: 'Tipo', key: 'hasSubscription' },
    { label: 'Precio', key: 'reservePrice' },
    { label: 'Plazas', key: 'seats' },
    { label: 'Capacidad', key: 'capacity' },
    { label: 'Localidad', key: 'username' },
    { label: 'Dirección', key: 'address' },
    { label: 'Organmización', key: 'organization' },
  ]

  const [pageNumber, setPageNumber] = useState(0)
  const [searchFilter, setSearchFilter] = useState<string>('')

  useEffect(() => {
    eventStore.getPaginatedEventsRequest(localStorage.getItem('user_etno_locality')!, searchFilter, pageNumber, 5)
  }, [pageNumber])

  const incrementPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const decrementPage = () => {
    setPageNumber(pageNumber - 1)
  }

  function deleteByGroup(){
    if(eventStore.getEventsListChecked.length > 0){
      eventStore.deleteAllById(localStorage.getItem('user_etno_locality')!)
    }
  }

  return (
    <div className="w-full h-full  relative">
      <div className=" flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Eventos</h2>
          <div className="mainButtonsDiv">
            {eventStore.getPaginatedEvents.content! && (
              <div hidden={eventStore.getPaginatedEvents.content.length === 0}>
                <CSVLink
                  data={eventStore.getPaginatedEvents.content!}
                  filename={'events.csv'}
                  enclosingCharacter={` `}
                  className="btnStandard mr-3"
                  target="_blank"
                  headers={headers} >Exportar a excel
                </CSVLink>
              </div>)}
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={(value) => setSearchFilter(value.currentTarget.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Título de noticia" required />
              <button onClick={() => eventStore.getPaginatedEventsRequest(localStorage.getItem('user_etno_locality')!, searchFilter, pageNumber, 5)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
            </div>
            <button onClick={deleteByGroup} type="button" className={`btnStandard ${eventStore.getPaginatedEvents.totalElements! < 1 ? 'invisible' : 'visible'}`}>
              <img src={Pencil} alt="Create" />
              Eliminar
            </button>
            <button onClick={() => eventStore.setModalCreate(true)} type="button" className="btnStandard ">
              <img src={Pencil} alt="Create" />
              Crear
            </button>
          </div>
          {eventStore.getModalCreate ? (
            <div>
              <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                <div className="fixed inset-0 w-screen h-screen">
                  <div className="w-screen  flex justify-start">
                    <CreateEvent />
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
        </div>
        <TableEvent currentPage={pageNumber} headerList={['Seleccionar', 'Título', 'Descripción', 'Tipo', 'Precio', 'Plazas', 'Capacidad', 'Localidad', 'Dirección', 'Organización', 'Acciones']} />
      </div>
      <div className="flex absolute left-0 bottom-0 right-0  items-center justify-center md:flex-row flex-col">
        <button onClick={decrementPage} disabled={pageNumber === 0}
          className="btnStandard mr-10">
          <img src={arrowLeft} alt="backward" />
          Anterior
        </button>
        <button onClick={incrementPage} disabled={pageNumber === eventStore.getPaginatedEvents.totalPages!! - 1 || eventStore.getPaginatedEvents.content?.length === 0}
          className="btnStandard">
          Siguiente
          <img src={arrowRight} alt="forward" />
        </button>
      </div>
      <ToastContainer style={{ margin: "50px" }} />
    </div>
  )
}
export default observer(Event)