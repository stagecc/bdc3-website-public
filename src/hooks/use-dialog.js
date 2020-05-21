import { useContext } from 'react'
import { DialogContext } from '../contexts'

export const useDialog = () => useContext(DialogContext)
