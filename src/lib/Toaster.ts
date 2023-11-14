import {get, writable, type Writable} from "svelte/store"
export const messages: Writable<ToastType[]> = writable([]);
import type { Toast as ToastType } from "./types/Toast";
import { browser } from "$app/environment";


export function showToast(text: string, type: ToastType["type"] = "success") {
    if(!browser){
        console.log(text)
        return
    }

    const regexMatch = text.match(/\{.*\}/)
    if(regexMatch){
        try{text = JSON.parse(regexMatch[0]).message}
        catch(e){}
    }

    console.log("showToast", text)
    const newMessage: ToastType = {text, type, id: Math.random().toString()}
    if(get(messages).find(m => m.text === text)){return}
    messages.update(messages => [...messages, newMessage])

    // remove message after 5 seconds
    setTimeout(() => { closeToast(newMessage.id) }, 5000)
}

export function closeToast(id: string) {
    messages.update(messages => messages.filter(message => message.id !== id))
}