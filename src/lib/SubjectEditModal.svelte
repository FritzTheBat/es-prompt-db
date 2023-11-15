
<form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg mb-5">Dokumenttyp (prompt subject) hinzufügen</h3>
    <form
        on:submit|preventDefault={() => complete()}
    >   

    
        {#each messages as message}
            <Alert text={message}></Alert>
        {/each}


        <input
            class="input input-bordered w-full"
            type="text"
            placeholder="Name"
            bind:value={data.name}
        />

        <textarea
            class="input input-bordered h-20 p-3 mt-2 w-full"
            placeholder="Beschreibung"
            bind:value={data.description} ></textarea>


        

        <button type="submit" disabled={data?.name?.length <= 2} class="btn btn-primary w-full mt-10">Hinzufügen</button>
    </form>
</form>
<form method="dialog" class="modal-backdrop">
    <button>close</button>
</form>


<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Alert from "./Alert.svelte";
    import type { Tables } from "./server/db";

    export let data: Partial<Tables<"prompt_subjects">>
    let messages: string[] = []

    const dispatch = createEventDispatcher();

    function complete(){
        dispatch('complete', data)
        addModal.close()
        data = {}
    }

   
</script>