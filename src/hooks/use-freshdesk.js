import { useEffect, useState } from 'react';
import axios from 'axios'

const FRESHDESK_API_ROOT = 'https://bdcatalyst.freshdesk.com/api/v2'
const FRESHDESK_FAQS_CATEGORY_ID = '60000157358'

const options =  {
    headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.GATSBY_FRESHDESK_API_KEY,
    }
}

export const useFreshdesk = (apiKey) => {
    const [folders, setFolders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const fetchArticles = async () => {
            await axios.get(`${ FRESHDESK_API_ROOT }/solutions/categories/${ FRESHDESK_FAQS_CATEGORY_ID }/folders`, options)
                .then(response => {
                    const folders = response.data
                    const articlePromises = folders.map(folder => axios.get(`${ FRESHDESK_API_ROOT }/solutions/folders/${ folder.id }/articles`, options)
                        .then(response => {
                            // A Freshdesk article's status is either 1 or 2, for draft or published, respectively
                            // We'll filter here for only the published articles.
                            folder.articles = response.data.filter(article => article.status === 2)
                            return folder
                        })
                    )
                    Promise.all(articlePromises)
                        .then(responses => setFolders(responses))
                    setIsLoading(false)
                })
                .catch(error => {
                    setError("An error occurred while fetching articles from Freshdesk.")
                    setIsLoading(false)
                })
        }
        fetchArticles()
    }, [])
    
    return { isLoading, folders, error }
}