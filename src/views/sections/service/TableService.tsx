import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Service } from "../../../models/section/Section"
import ServiceStore from "../../../viewmodels/service/ServiceStore"
import EditService from "./create/EditService"
import serviceRed from "../../../assets/menu/serviceRed.svg"

const serviceStore = ServiceStore.getServiceStore()

interface PropTable {
    headerList: string[],
    list?: any,
    currentPage?: number
}

const TableService = (prop: PropTable) => {
    const [confirm, setConfirm] = useState(false)
    const [delOwner, setDelOwner] = useState<string>("")
    const [delId, setDelId] = useState<string>("")

    function deleteConfirmation(service: Service) {
        setConfirm(true)
        setDelOwner(service.owner!!)
        setDelId(service.idService!!)
    }

    const deleteService = async (idService: string) => {
        await serviceStore.deleteService(localStorage.getItem('user_etno_locality')!, idService)
        setConfirm(false)
        window.location.reload()
    }

    function saveService(service: Service) {
        serviceStore.updateService(service)
        serviceStore.setModalEdit(true)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            {serviceStore.getPaginatedService.content?.length === 0 ? (
                <div className="flex flex-row m-1">
                    <img src={serviceRed} alt="BIG" />
                    <label className="text-xl my-auto ml-5 font-medium">No hay Servicios</label>
                </div>
            ) : (
                <div>
 {serviceStore.getModalEdit ? (
                <div>
                    <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className="w-screen  flex justify-start ">
                                <EditService />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase  bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 text-center ">
                    <tr>
                        {prop.headerList.map((item, index) => (
                            <th key={index} scope="col" className="px-6 py-3 ">
                                <div className="min-w-max">
                                    {item}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {serviceStore.getPaginatedService.content?.map((service, index) => (
                        serviceStore.getPaginatedService.content!!.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                            <td className="tableCamp ">
                                <div className="overflow-y-auto max-h-20">
                                <input type="checkbox" onChange={(value) => {
                                        if (value.currentTarget.checked) {
                                          serviceStore.servicesListChecked.push(service);
                                        } else {
                                           serviceStore.servicesListChecked.splice(serviceStore.getServicesCheckedList.indexOf(service), 1)
                                        }
                                        console.log(value.currentTarget.checked)}
                                    } ></input>
                                </div>
                            </td>
                            <th scope="row" className="tableCamp font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                {service.category}
                            </th>
                            <td className="tableCamp ">
                                <div className="overflow-y-auto max-h-20">
                                {service.owner}
                                </div>
                            </td>
                            <td className="tableCamp ">
                                {service.number}
                            </td>
                            <td className="tableCamp ">
                            <div className="overflow-y-auto max-h-20">
                                {service.schedule}
                                </div>
                            </td>
                            <td className="tableCamp">
                            <div className="overflow-y-auto max-h-20">
                                {service.description}
                                </div>
                            </td>
                            <td className="tableCamp ">
                                <a className=" text-blue-500 hover:text-blue-600" href={service.webUrl}>{service.webUrl}</a>
                            </td>
                            <td className="flex items-center justify-center px-6 py-4">
                                <div className="h-20 flex items-center justify-center">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                        saveService(service)
                                    }}>Editar</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => deleteConfirmation(service)}>Eliminar</a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {confirm ? (
                <div>
                    <div className=" fixed inset-0 z-50  bg-opacity-50 backdrop-blur-sm flex justify-center items-center"  >
                        <div className="fixed inset-0 w-screen h-screen">
                            <div className=" flex justify-center mt-10 ">
                                <div className="flex flex-col bg-white lg:w-1/4 w-1/2 h-1/2 rounded-md border-2">
                                    <label className="text-2xl text-center mt-5 overflow-hidden">¿Seguro quiere eliminar {delOwner}?</label>
                                    <div className="flex justify-center m-auto mt-5 mb-3">
                                        <button className="btnStandard w-14 h-10 mr-5 " onClick={() => deleteService(delId)}>SI</button>
                                        <button className="btnStandard w-14 h-10" onClick={() => setConfirm(false)}>NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>}
                </div>
            )}
           
        </div>
    )
}
export default observer(TableService)