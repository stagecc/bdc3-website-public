import styled from 'styled-components'

export const inputStyle = `
    flex: 1;
    padding: 0.5rem;
    outline: none;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-lightgrey);
    transition: border-color 250ms, filter 250ms;
    &:focus {
        border-color: var(--color-eggplant);
        filter: drop-shadow(0 0 0.1rem var(--color-eggplant));
    }
`

export const TextInput = styled.input.attrs(props => ({ type: props.type }))`
    ${ inputStyle }
`

export const Select = styled.select`
    ${ inputStyle }
`

export const Option = styled.option``

export const TextArea = styled.textarea`
    resize: vertical;
    height: 200px;
    min-height: 200px;
    max-height: 800px;
    ${ inputStyle }
`

export const HelpText = styled.small`
    padding: 0.25rem 0;
    font-style: italic;
`

