import { useEffect } from "react"
import { observer } from 'mobx-react-lite'

import EventStore from "../../viewmodels/Event/EventStore"
const eventStore = EventStore.getEventStore()

interface PropTable {
    headerList: string[],
    list?: any
}

const Table = (prop: PropTable) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    {prop.headerList.map((item, index) => (
                        <th scope="col" className="px-6 py-3">
                            {item}
                        </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                {prop.list.map((event: any, index: any) => (
                        prop.list.length > 0 &&
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {event.title}
                        </th>
                        <td className="px-6 py-4">
                            {event.description}
                        </td>
                        <td className="px-6 py-4">
                            {event.reservePrice}€
                        </td>
                        <td className="px-6 py-4">
                            {event.seats}
                        </td>
                        <td className="px-6 py-4">
                            {event.capacity}
                        </td>
                        <td className="px-6 py-4">
                            {event.username}
                        </td>
                        <td className="px-6 py-4">
                            {event.address}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline m-2" onClick={() => eventStore.deleteEvent('Bolea', event.title!!)}>Eliminar</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default observer(Table)