<script lang="ts">
	import { base } from "$app/paths";

  export let item: any = {};
  export let onDelete = () => {};

</script>

<li
  class="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 border-b-[1px] border-white transition duration-150 ease-in-out"
>
  <a href="{base}/subjects/{item.id}">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="min-w-0 flex-1 flex items-center">
        <div class="text-sm leading-5 font-medium truncate">{item.name||item.label}</div>
      </div>

      <button
        on:click|preventDefault={onDelete}
        class="w-4 h-4 ml-2 border-2 hover:border-black rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </a>
</li>
