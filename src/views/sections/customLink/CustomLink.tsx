import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Pencil from "../../../assets/menu/create.svg"
import { CustomLink } from "../../../models/section/Section"
import CreateCustomLink from "./create/CreateCustomLink"
import EditCustomLink from "./create/EditCustomLink"
import CustomLinkStore from "../../../viewmodels/customLink/CustomLinkStore"
import { ToastContainer } from "react-toastify"
import arrowRight from "../../../assets/menu/arrowRight.svg"
import arrowLeft from "../../../assets/menu/arrowLeft.svg"
import customLinkGold from "../../../assets/menu/customLinkGold.svg"

const customLinkStore = CustomLinkStore.getCustomLinkStore()

const CustomLinkPage = () => {

    const [pageNumber, setPageNumber] = useState<number>(0)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [delName, setDelName] = useState<string>("")
    const [delId, setDelId] = useState<string>("")
    const [searchFilter, setSearchFilter] = useState<string>('')

    useEffect(() => {
        customLinkStore.getPaginatedCLinkRequest(localStorage.getItem('user_etno_locality')!, searchFilter, pageNumber, 12)
    }, [pageNumber])

    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
    }
    const decrementPage = () => {
        setPageNumber(pageNumber - 1)
    }

    function saveLink(link: CustomLink) {
        customLinkStore.setEditLinkModal(true)
        customLinkStore.updateCustomLink(link)
    }

    function deleteConfirmation(link: CustomLink) {
        setConfirm(true)
        setDelName(link.name!!)
        setDelId(link.idCustomLink!!)
    }
    const deleteCustomLink = async (idLink: string) => {
        await customLinkStore.deleteCustomLink(localStorage.getItem('user_etno_locality')!, idLink)
        setConfirm(false)
    }

    return (
        <div className="w-full h-full min-w-5/6 relative flex flex-col">
            <div className="flex flex-row">
                <h2 className="lg:text-2xl text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Enlaces Personalizados</h2>
                <div className="mainButtonsDiv">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input onChange={(value) => setSearchFilter(value.currentTarget.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Título de noticia" required />
              <button onClick={() => customLinkStore.getPaginatedCLinkRequest(localStorage.getItem('user_etno_locality')!, searchFilter, pageNumber, 5)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
            </div>
                    
                    <button type="button" className="btnStandard" onClick={() => customLinkStore.setCreateLinkModal(true)}>
                        <img src={Pencil} alt="Create" />
                        Crear
                    </button>
                </div>
            </div>
            {customLinkStore.getCreateLinkModal ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center">
                                <CreateCustomLink />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {customLinkStore.getEditLinkModal ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-center">
                                <EditCustomLink />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            {customLinkStore.getPaginatedCustomLink.content?.length === 0 ? (
                <div className="flex flex-row p-2 mt-2 rounded-md shadow-md">
                    <img src={customLinkGold} alt="BIG" />
                    <label className="text-xl my-auto ml-4 mt-3.5 font-medium">No hay Enlaces Personalizados</label>
                </div>
            ) : (
                <div className="relative  w-full overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-1">
                    <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <div className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center">
                            <div className="flex md:w-1/3 w-full m-auto  p-5 shadow-xl  ">
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-1 overflow-y-auto lg:overflow-hidden w-full h-3/4">
                <div className="w-full grid lg:grid-cols-4 lg:grid-rows-3  grid-cols-1">
                    {customLinkStore.getPaginatedCustomLink.content?.map((item, index) => (
                        customLinkStore.getPaginatedCustomLink.content!!.length > 0 &&
                        <div key={index} className={`border-2 p-1 rounded-md relative bg-gray-100 shadow-md lg:h-full  ${customLinkStore.paginatedCustomLink.content!!.length > 2 ? 'h-40'
                            : 'h-60'}`}>
                            <div className="h-1/3 p-2 text-center overflow-hidden  flex items-center justify-center flex-col">{item.name}</div>
                            <div className="h-1/3 flex m-auto items-center text-blue-500 hover:text-blue-600 
                            hover:font-medium justify-center   text-xl overflow-hidden bg-gray-200 flex-col"><a href={item.webUrl}>{item.webUrl}</a></div>
                            <div className="h-1/3  p-2 text-center overflow-hidden  flex items-center bg-gray-100 justify-center flex-row">
                                <button className="btnStandard mr-5 h-8 lg:h-10" onClick={() => saveLink(item)}>Editar</button>
                                <button className="btnStandard h-8 lg:h-10" onClick={() => deleteConfirmation(item)}>Borrar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer style={{ marginBottom: "50px" }} />
            <div className="flex flex-2  items-center justify-center md:flex-row flex-col ">
                <button
                    className="btnStandard mr-10" onClick={decrementPage} disabled={pageNumber === 0}>
                    <img src={arrowLeft} alt="backward" />
                    Anterior
                </button>
                <button
                    className="btnStandard"
                    onClick={incrementPage} disabled={pageNumber === customLinkStore.getPaginatedCustomLink.totalPages!! - 1 || customLinkStore.getPaginatedCustomLink.content?.length === 0}>
                    Siguiente
                    <img src={arrowRight} alt="forward" />
                </button>
            </div>
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5">¿Seguro quiere eliminar {delName}?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteCustomLink(delId)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
        </div>
    )
}
export default observer(CustomLinkPage)