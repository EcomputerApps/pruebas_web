import { makeObservable, action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { News, PaginatedNews } from "../../models/section/Section";

class NewsStore{
    serverIp : string = "192.168.241.51"
    static newsStore : NewsStore

    static getNewsStore(){
        if(this.newsStore === undefined){
            this.newsStore = new NewsStore()
        }
        return this.newsStore
    }

       //Observables =>
       paginatedNews : PaginatedNews = {}
      

    constructor(){
        makeObservable(this, {
            paginatedNews : observable,
            getRequestNews : action,
            addRequestNews: action,
            deleteNews : action,
            updateNewsList: action,
            updatePaginatedNews: action,
            getPaginatedNews: computed
        })
    }

    updateNewsList( news : News[]){
        this.paginatedNews.content = news
    }
    updatePaginatedNews( pagiantedNews: PaginatedNews){
        this.paginatedNews = pagiantedNews
    }
     get getPaginatedNews(){
        return this.paginatedNews
    }

    async addRequestNews(locality: String, news: News){
        const response = await fetch(`http://${this.serverIp}:8080/users/add/news?username=${locality}`, {
            method: 'POST',
            body: JSON.stringify(news),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        },
        )
        if(response.ok){
            this.paginatedNews.content?.push(news)
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
        }else{
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
  
    async getRequestNews( locality : string, pageNum: number, elementSize: number){
        const response = await fetch(`http://${this.serverIp}:8080/news?username=${locality}&pageNum=${pageNum}&elementSize=${elementSize}`,{
            method: 'GET',
           
        })
        const news = await response.json()
        this.updatePaginatedNews(news)
    }

    async deleteNews(username: string, title : string){
        const response = await fetch(`http://${this.serverIp}:8080/users/delete/news?username=${username}&title=${title}`,{
            method : 'DELETE',
            headers : {
                'Access-Control-Allow-Origin':'*'
            }
        })
        if(response.ok){
        const newPaginatedNews = this.paginatedNews.content!!.filter((item)=>item.title !== title)
        this.updateNewsList(newPaginatedNews)
        toast.success('Se ha borrado exitosamente', {
            position: 'bottom-center',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light"
      })
    }else{
        toast.error('No se ha podido borrar', {
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


}

export default NewsStore