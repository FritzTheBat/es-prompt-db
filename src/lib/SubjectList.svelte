<script lang="ts">
  import { isAdmin, user } from "$lib/user";
  import { supabase } from "./db";
  import Subject from "$lib/SubjectListItem.svelte";
  import AddModal from "./SubjectEditModal.svelte";
  import { showToast } from "./Toaster";
  import type { Tables } from "./server/db";


  let items: Tables<"prompt_subjects">[] = [];
  let newTaskText = "";
  let errorText = "";
  let searchText = ""
  let searchInputRef: HTMLInputElement
  let itemToDeleteId: number
  let maxItemsToShow = 999
  export let parentId: number | null = null

  $: itemsFiltered = items.filter((x) => x.name!.toLowerCase().includes(searchText.toLowerCase()))

  $: if(parentId || !parentId) {
    fetchData()
    searchInputRef?.focus()
  }


  const fetchData = async () => {
    let { data, error } = await supabase
      .from("prompt_subjects")
      .select("*")
      [parentId?"eq":"is"]("parent_id", parentId)
      .order("id", { ascending: false })
    if (error) {
      console.log("error", error)
    } else {
      items = data!
    }
  };

 
  let newItemData = {
    name: "",
    regNo: "",
  };

 

  let prompt = ""

  function add(){
    // showToast("Test")
    addModal.showModal()
    return undefined
  }

  const deleteItem = async (id: number) => {
    try {
      const {status} = await supabase.from("prompt_subjects").delete().eq("id", id)
      if (status == 204) throw "nicht gefunden / Rechte fehlen"
      items = items.filter((x) => x.id != id)
      showToast("Gelöscht")
    } catch (error) {
      console.log("error", error)
      showToast("Fehler: " + error, "error")
    }
    deleteModal.close()
  }

  const addItem = async (data: any) => {
      let { data: newItem, error } = await supabase
        .from("prompt_subjects")
        .insert({name: data.name, description: data.description, user_id: $user?.id, parent_id: parentId })
        .select()
        .single()

      if (error) {
        errorText = error.message
      } else {
        items = [newItem!, ...items]
        newTaskText = ""
      }
  }

  
</script>
{#if items.length}
  <div class="w-full">
    <div class="flex justify-between">
      <h2 class="mb-6 text-xl h3">
        Themen
      </h2>
      <input type="text" bind:this={searchInputRef} bind:value={searchText} class="form-control ms-5 input text-right input-sm" placeholder="suchen" />
    </div>
    <div  class="flex justify-center flex-col gap-10">
      
      <div class="bg-gray-100 overflow-hidden rounded-md">
        <ul>
          {#each itemsFiltered.slice(0, maxItemsToShow) as item (item.id)}
            <Subject {item} onDelete={() => {itemToDeleteId = item.id; deleteModal.showModal()}} />
          {/each}
        </ul>
      </div>
      {#if itemsFiltered.length == 0}
        <div class="bg-gray-100 overflow-hidden rounded-md">
          <div class="p-10 text-center">
            Keine Typen {searchText?'gefunden':'vorhanden'}.
          </div>
        </div>
      {/if}

      {#if parentId}
        <button on:click={add} class="btn btn-primary">Thema hinzufügen</button>
      {/if}
    </div>

  </div>

{:else}
  <div class="mt-4 text-gray-400">
    <a href="#">+ Thema hinzufügen</a>
  </div>
{/if}


<dialog id="addModal" class="modal">
  <AddModal on:complete={({detail}) => {addItem(detail)}} data={newItemData} />
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


