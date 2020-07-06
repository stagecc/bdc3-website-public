import { useEffect, useState } from 'react';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useLocalStorage } from './use-local-storage'

const fenceUserinfoUrl = `${ process.env.GATSBY_FENCE_AUTH_ROOT }/user/user/`

const parseHash = hash => {
    const hashReducer = (object, item) => {
        const [key, value] = item.split('=')
        object[key] = value
        return object
    }
    return hash.split('&').reduce(hashReducer, {})
}

const extractProjects = user => {
    return Object.keys(user.authz)
        .filter(key => key.includes('/projects/'))
        .map(key => key.substr(key.lastIndexOf('/') + 1))
}

export const useFence = location => {
    const [fenceUser, setFenceUser] = useLocalStorage('fenceUser', null)
    const [authParams, setAuthParams] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [authed, setAuthed] = useState(false)
    const [user, setUser] = useState()
    const [projects, setProjects] = useState()

    useEffect(() => {
        const hashParams = parseHash(location.hash.substr(1))
        setAuthParams(hashParams)
    }, [location.hash])
    
    useEffect(() => {
        const fetchProjects = async accessToken => {
            await axios.get(fenceUserinfoUrl, { headers: { 'Authorization': `Bearer ${ accessToken }` } })
                .then(response => {
                    console.log(response)
                    setUser(response.data)
                    setProjects(extractProjects(response.data).sort())
                })
                .catch(error => { setError(error) })
        }
        // if fence user found in local storage
        if (fenceUser) {
            setIsLoading(true)
            try {
                const jwt = jwtDecode(fenceUser.id_token)
                const { exp } = jwt
                const now = new Date()
                const expirationDate = new Date(exp * 1000) // seconds to milliseconds
                if (now < expirationDate) {
                    const { context: user } = jwt
                    setUser(user)
                    fetchProjects(fenceUser.access_token)
                    setAuthed(true)
                } else {
                    throw new Error('nope')
                }
            } catch {
                setAuthed(false)
            }
        }
        // if fence query params are present
        if (authParams && authParams.hasOwnProperty('id_token')) {
            setIsLoading(true)
            const jwt = jwtDecode(authParams.id_token)
            const { exp } = jwt
            const now = new Date()
            const expirationDate = new Date(exp * 1000) // seconds to milliseconds
            if (now < expirationDate) {
                const { context: user } = jwt
                setUser(user)
                fetchProjects(authParams.access_token)
                setFenceUser(authParams)
                setAuthed(true)
            } else {
                setAuthed(false)
                setError('Sorry &mdash; an error occurred during authentication!')
            }
        }
        setIsLoading(false)
    }, [authParams, fenceUser, setFenceUser])
    
    return { authed, user, projects, isLoading, error }
}