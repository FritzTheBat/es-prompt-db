
<form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg mb-5">Prompt zu {parentName} </h3>
    <form  on:submit|preventDefault={() => complete()}>   
    
        {#each messages as message}
            <Alert text={message}></Alert>
        {/each}


        <div class="flex w-full gap-3">
            <input
                class="input input-bordered w-2/3"
                type="text"
                placeholder="Kurzname"
                bind:value={data.label}
            />

            <select bind:value={data.meta.role} class="select  select-bordered w-full max-w-xs">
                <option value="user">Role: User</option>
                <option value="system">Role: System</option>
            </select>

        </div>


        <div class="form-control mt-4">

            <label class="label" for="content">
                Vollständiger Prompt:    
            </label>
            <textarea
                class="input input-bordered p-3 mt-2 w-full h-64"
                placeholder="Prompt"
                id="content"
                bind:value={data.content} ></textarea>
        </div>

        

        <button type="submit" disabled={data?.name?.length <= 2} class="btn btn-primary w-full mt-10">Speichern</button>
    </form>
</form>
<form method="dialog" class="modal-backdrop">
    <button>close</button>
</form>


<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Alert from "./Alert.svelte";
    import type { Tables } from "./server/db";

    export let data: Partial<Tables<"prompts">>
    export let parentName: string
    let messages: string[] = []

    const dispatch = createEventDispatcher();
    $: {if(!data.meta) data.meta = {role: "user"} }

    function complete(){
        dispatch('complete', data)
        addModal.close()
        data = {}
    }

   
</script>