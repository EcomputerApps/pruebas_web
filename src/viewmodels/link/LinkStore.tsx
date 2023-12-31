import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { Link, LinkList, PaginatedLink } from "../../models/section/Section";
import { urlBase } from "../../utils/global";
import ImageStore from "../image/ImageStore";

const imageStore = ImageStore.getImageStore()

class LinkStore {
    serverIp: string = "192.168.241.51"
    static linkStore: LinkStore

    static getLinkStore() {
        if (this.linkStore === undefined) {
            this.linkStore = new LinkStore()
        }
        return this.linkStore
    }

    //Observable =>
    paginatedLink: PaginatedLink = {}
    link: Link = {}
    allLinks: LinkList = {}
    title: string = ""
    id: string = ""
    linkString: string = ""
    modalCreate: boolean = false
    modalEdit: boolean = false
    linksListChecked: Link[] = []

    constructor() {
        makeObservable(this, {
            allLinks: observable,
            modalEdit: observable,
            modalCreate: observable,
            linksListChecked: observable,
            setModalCreate: action,
            getModalEdit: computed,
            getModalCreate: computed,
            paginatedLink: observable,
            title: observable,
            link: observable,
            id: observable,
            updateLink: action,
            getLink: computed,
            linkString: observable,
            setTitle: action,
            setLinkString: action,
            setId: action,
            getAllLinksRequest: action,
            getPaginatedLinkRequest: action,
            addRequestLink: action,
            updateLinkList: action,
            updatePaginatedLink: action,
            getPaginatedLink: computed,
            getTitle: computed,
            getId: computed,
            getLinkString: computed,
            updateAllLinks: action,
            getAllLinks: computed,
            getLinksCheckedList: computed
        })
    }
    updateAllLinks(links: Link[]) {
        this.allLinks.links = links
    }
    get getAllLinks() {
        return this.allLinks
    }
    setModalEdit(mode: boolean) {
        this.modalEdit = mode
    }
    get getModalEdit() {
        return this.modalEdit
    }
    setModalCreate(mode: boolean) {
        this.modalCreate = mode
    }
    get getModalCreate() {
        return this.modalCreate
    }

    setTitle(title: string) {
        this.title = title
    }
    setLinkString(link: string) {
        this.linkString = link
    }
    setId(id: string) {
        this.id = id
    }
    get getTitle() {
        return this.title
    }
    get getId() {
        return this.id
    }
    get getLinkString() {
        return this.linkString
    }
    updateLinkList(links: Link[]) {
        this.paginatedLink.content = links
    }
    updatePaginatedLink(paginatedLink: PaginatedLink) {
        this.paginatedLink = paginatedLink
    }
    get getPaginatedLink() {
        return this.paginatedLink
    }
    updateLink(link: Link) {
        this.link = link
    }
    get getLink() {
        return this.link
    }
    get getLinksCheckedList() {
        return this.linksListChecked
    }

    async getPaginatedLinkRequest(locality: string, title: string, pageNum: number, elementSize: number) {
        const response = await fetch(`${urlBase}/links/paginated?username=${locality}&title=${title}&pageNum=${pageNum}&elementSize=${elementSize}`, {
            method: 'GET',
        })
        const link = await response.json()
        this.updatePaginatedLink(link)
    }

    async getAllLinksRequest(locality: string) {
        const response = await fetch(`${urlBase}/links?username=${locality}`, {
            method: 'GET',
        })
        const link = await response.json()
        this.updateAllLinks(link)
    }

    async deleteLink(username: string, idLink: string) {
        const response = await fetch(`${urlBase}/users/delete/link?username=${username}&idLink=${idLink}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.ok) {
            const newLinks = this.paginatedLink.content!!.filter((item) => item.idLink !== idLink)
            this.updateLinkList(newLinks)
            this.updateLink({})
            toast.success('Se ha borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }

    }
    async addRequestLink(username: string, link: Link) {
        const response = await fetch(`${urlBase}/users/add/link?username=${username}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(link)
        })
        if (response.ok) {
            this.link = link
            toast.success('Se ha añadido exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toast.error('No se ha añadido correctamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }
    async editLink(locality: string, linkId: string, link: Link) {

        const response = await fetch(`${urlBase}/users/update/link?username=${locality}&linkId=${linkId}`, {
            method: 'PUT',
            body: JSON.stringify(link),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (response.ok) {
            toast.success('Se ha actualizado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setTimeout(function () {
                window.location.reload();
            }, 1500);
        } else {
            toast.error('No se ha actualizado', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }

    async deleteAllById(locality: string) {
        const response = await fetch(`${urlBase}/links/delete/some?username=${locality}`, {
            method: 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*',
                'content-type': 'application/json'
            },
            body: JSON.stringify(this.linksListChecked)
        })
        if(response.ok){
            toast.success('Se han borrado exitosamente', {
                position: 'bottom-center',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
          setTimeout(function(){
            window.location.reload();
         }, 1500);
        }else{
            toast.error('No se ha podido borrar', {
                position: 'bottom-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
          })
        }
    }
}
export default LinkStore