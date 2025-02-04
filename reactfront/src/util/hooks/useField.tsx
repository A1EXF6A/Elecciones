import { ChangeEvent, useState } from "react"

const useField = (type: string = 'text', needReset: boolean = false) => {
    const [value, setValue] = useState<string>('')

    const reset = () => {
        setValue('')
    }

    const onChange = (e: ChangeEvent) => {
        setValue((e.target as HTMLInputElement).value)
    }

    if (!needReset) return {
        type,
        value,
        onChange
    }

    return {
        reset,
        type,
        value,
        onChange,
    }
}

export { useField }