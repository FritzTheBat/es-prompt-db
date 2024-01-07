<div class="text-sm opacity-60 breadcrumbs">
    <ul>
      <li>
        <a href={base}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current me-2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          Home
        </a>
      </li> 

      {#each breadCrumbs as breadcrumb}

        <li>
          <a href="{base}/subjects/{breadcrumb.id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current me-2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            {breadcrumb.name}
          </a>
        </li>
      {/each}

    </ul> 

</div>
<div class="relative">

    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <h1 class="text-xl font-bold py-1  hover:bg-gray-100 rounded-md hover:outline-gray-300 outline-offset-2 focus:outline-gray-300 focus:bg-gray-100 transition-all  hover:px-4 focus:px-4"
        on:mouseover={() => {hoverHead=true}} bind:textContent={headlineText} on:change={() => {saveHeadingDebounced()}} on:mouseleave={() => {hoverHead=false}} contenteditable="true">{data.subject.name}</h1>
    {#if hoverHead}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="w-6 h-6 text-gray-300 absolute right-3 top-1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
    {/if}

</div>
  
<div class=" gap-3">
    <SubjectList parentId = {data.subject.id}/>
    <PromptList subject = {data.subject}/>
</div>

<script lang="ts">
    import PromptList from "$lib/PromptList.svelte";
    import { debounce } from "$lib/util";
    import { showToast } from "$lib/Toaster";
    import { supabase } from "$lib/db";
    import SubjectList from "$lib/SubjectList.svelte";
    import { base } from "$app/paths";
	export let data: import('./$types').PageData
    let breadCrumbs: {name: string, id: number}[] = []
    let hoverHead = false
    let headlineText: string
    let saveHeadingDebounced = debounce(async (newHeadline: string) => {
        if(newHeadline == data.subject.name) return
        if(newHeadline.length < 3) {
            showToast("Name des Dokumenttyps muss mindestens 5 Zeichen lang sein", "error")
            headlineText = data.subject.name || "Unbenannter Dokumenttyp"
            return
        }
        await supabase.from("prompt_subjects").update({name: newHeadline}).match({id: data.subject.id})
        data.subject.name = newHeadline
        showToast("Dokumenttyp gespeichert")
    }, 3000)

    $: { breadCrumbs = []; if(data.subject.parent_id) addParentToBreadcrumbs(data.subject.parent_id)}

    async function addParentToBreadcrumbs(id: number){
        let {data: parent} = await supabase.from("prompt_subjects").select("id, name, parent_id").eq("id", id).single()
        if(parent){
            breadCrumbs = [parent, ...breadCrumbs]
            if(parent!.parent_id) addParentToBreadcrumbs(parent!.parent_id)
        }
    }

    //$: saveHeadingDebounced(headlineText)

</script>

