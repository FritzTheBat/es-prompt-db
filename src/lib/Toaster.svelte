<script lang="ts">
    import Toast from "./Toast.svelte";
    import { messages } from "./Toaster";
    
    export function showToast(text: string, type: "success" | "error" | "warning" | "info" = "success") {
        messages.update((messages) => {
            return [...messages, { text, type: "success" }];
        });
    }


</script>


<div class="fixed bottom-2 right-5">
    
    {#each $messages as message}
        <Toast message={message}></Toast>
    {/each}
</div>  