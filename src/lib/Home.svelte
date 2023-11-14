<script>
  import { supabase } from "./db";
  import CompanyList from "$lib/PromptList.svelte";
  import Toaster from "./Toaster.svelte";


 

</script>

<div
  class="w-full h-full flex flex-col justify-center items-center p-4">
  <CompanyList />

  
</div>
