<script lang="ts">
  import { isAdmin, user } from "$lib/user";
  import { supabase } from "./db";
  import { onDestroy, onMount } from "svelte";
  import Item from "$lib/Item.svelte";
  import AddModal from "./AddModal.svelte";
  import { _, translate } from "$lib/i18n";
  import { goto } from "$app/navigation";
  import { showToast } from "./Toaster";
  import type { Tables } from "./server/db";


  let items: Tables<"prompt_subjects">[] = [];
  let newTaskText = "";
  let errorText = "";
  let searchText = ""
  let searchInputRef: HTMLInputElement
  let itemToDeleteId: number
  let maxItemsToShow = 5

  $: companiesFiltered = items.filter((x) => x.name.toLowerCase().includes(searchText.toLowerCase()))
  $: {
    if(items.length === 1 && !isAdmin($user)){
      goto(`/shares/${companiesFiltered[0].id}`)
    }
  }

  const fetchData = async () => {
    let { data, error } = await supabase
      .from("prompt_subjects")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.log("error", error);
    } else {
      items = data;
    }
  };

 
  let newItemData = {
    name: "",
    regNo: "",
  };

  onMount(() => {
    fetchData()
    searchInputRef.focus()
  })

  let prompt = ""

  function add(){
    // showToast("Test")
    addModal.showModal()
    return undefined
  }

  const deleteItem = async (id: number) => {
    try {
      // const confirmed = confirm("Wirklich löschen? Das kann nicht rückgängig gemacht werden.")
      // if(!confirmed) return
      await supabase.from("prompt_subjects").delete().eq("id", id)
      items = items.filter((x) => x.id != id)
      showToast(translate("Gelöscht"))
    } catch (error) {
      console.log("error", error)
    }
    deleteModal.close()
  }

  const addItem = async (data: any) => {
      let { data: newItem, error } = await supabase
        .from("prompt_subjects")
        .insert({name: data.name, description: data.description, user_id: $user?.id })
        .select()
        .single()

      if (error) {
        errorText = error.message
      } else {
        items = [newItem, ...items]
        newTaskText = ""
      }
  }

  
</script>

<div class="w-full">
  <div class="flex justify-between">
    <h1 class="mb-6 text-xl h2">
      Deine Dokumenttypen
    </h1>
    <input type="text" bind:this={searchInputRef} bind:value={searchText} class="form-control ms-5 input input-sm" placeholder="{$_("suchen")}" />
  </div>
  <div style="width: 400px" class="flex justify-center flex-col gap-10">
    
    <div class="bg-gray-100 overflow-hidden rounded-md">
      <ul>
        {#each companiesFiltered.slice(0, maxItemsToShow) as item (item.id)}
          <Item {item} onDelete={() => {itemToDeleteId = item.id; deleteModal.showModal()}} />
        {/each}
      </ul>
    </div>

    <button on:click={add} class="btn btn-primary">{$_("Hinzufügen")}</button>
  </div>

</div>


<dialog id="addModal" class="modal">
  <AddModal on:complete={({detail}) => {addItem(detail)}} data={newItemData} />
</dialog>



<dialog id="deleteModal" class="modal">
  <div class=" p-10 card card-body bg-white">
    {$_("Wirklich löschen? Das kann nicht rückgängig gemacht werden.")}
    <div class="flex gap-5 mt-4 justify-center">
      <button class="btn btn-danger" on:click={() => {deleteItem(itemToDeleteId)}}>{$_("Löschen")}</button>
      <button class="btn btn-primary" onclick="deleteModal.close()">{$_("Abbrechen")}</button>
    </div>
  </div>
</dialog>


<style>
  
</style>