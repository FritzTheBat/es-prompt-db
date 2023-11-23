<script lang="ts">
    import { isAdmin, user } from "$lib/user";
    import { supabase } from "./db";
    import { onMount } from "svelte";
    import AddModal from "./PromptEditModal.svelte";
    import { goto } from "$app/navigation";
    import { showToast } from "./Toaster";
    import type { Tables } from "./server/db";
  
    let items: Tables<"prompts">[] = [];
    export let subject: Tables<"prompt_subjects">
    let errorText = "";
    let searchText = ""
    let searchInputRef: HTMLInputElement
    let itemToDeleteId: number
    let maxItemsToShow = 999
    let parentName = subject.name!
  
    $: itemsFiltered = items.filter((x) => x.label?.toLowerCase().includes(searchText.toLowerCase()))
  
  
    const fetchData = async () => {
      let { data, error } = await supabase
        .from("prompts")
        .select("*")
        .eq("subject_id", subject.id)
        .order("id", { ascending: false });
      if (error) {
        console.log("error", error)
      } else {
        items = data!
      }
    };
  
   
    let newItemData = {} as any;
  
    onMount(() => {
      fetchData()
      searchInputRef.focus()
    })
  
  
    function add(){
      // showToast("Test")
      editItem(null)
      addModal.showModal()
      return undefined
    }
  
    const deleteItem = async (id: number) => {
      try {
        await supabase.from("prompts").delete().eq("id", id)
        items = items.filter((x) => x.id != id)
        showToast("Gelöscht")
      } catch (error) {
        console.log("error", error)
      }
      deleteModal.close()
    }
  
    const saveItem = async (data: any) => {
      let { data: newItem, error } = await supabase
        .from("prompts")
        .upsert({...data, user_id: $user?.id, subject_id: subject.id})
        .select()
        .single()

      if (error) {
        errorText = error.message
      } else if(!data.id) {
        items = [newItem!, ...items]
      }
      else {
        items =  items.map((x) => x.id == newItem!.id ? newItem! : x)
      }
    }
  
    
  

    function editItem(item: Tables<"prompts"> | null) {
        newItemData = item||{}
        addModal.showModal()
    }
</script>
  
  <div class="w-full">
    <div class="flex justify-between">
      <h2 class="mb-6 text-l font-bold">
        Prompts
      </h2>
      <input type="text" bind:this={searchInputRef} bind:value={searchText} class="form-control ms-5 input input-sm" placeholder="suchen" />
    </div>
    <div style="width: 400px" class="flex justify-center flex-col gap-2">
      
      <div class="bg-gray-100 overflow-hidden rounded-md">
        <ul>
          {#each itemsFiltered.slice(0, maxItemsToShow) as item (item.id)}

          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            on:click={() => {editItem(item)}}
            class="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 border-b-[1px]
                border-white transition duration-150 ease-in-out">
            
                <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="min-w-0 flex-1 flex items-center">
                    <div class="text-sm leading-5 font-medium truncate">{item.label}</div>
                </div>

                <button
                    on:click|preventDefault|stopPropagation={() => {itemToDeleteId = item.id; deleteModal.showModal()}}
                    class="w-4 h-4 ml-2 border-2 hover:border-black rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1
                        0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                    </svg>
                </button>
                </div>
            </li>

          {/each}
        </ul>
      </div>

      {#if itemsFiltered.length == 0}
        <div class="bg-gray-100 overflow-hidden rounded-md">
          <div class="p-10 text-center">
            Keine Prompts {searchText?'gefunden':'vorhanden'}.
          </div>
        </div>
      {/if}
  
      <button on:click={add} class="btn btn-primary">Hinzufügen</button>
    </div>
  
  </div>
  
  
  <dialog id="addModal" class="modal">
    <AddModal on:complete={({detail}) => {saveItem(detail)}} {parentName} data={newItemData} />
  </dialog>
  
  
  
  <dialog id="deleteModal" class="modal">
    <div class=" p-10 card card-body bg-white">
      Wirklich löschen? Das kann nicht rückgängig gemacht werden.
      <div class="flex gap-5 mt-4 justify-center">
        <button class="btn btn-danger" on:click={() => {deleteItem(itemToDeleteId)}}>Löschen</button>
        <button class="btn btn-primary" onclick="deleteModal.close()">Abbrechen</button>
      </div>
    </div>
  </dialog>
  
  
  <style>
    
  </style>