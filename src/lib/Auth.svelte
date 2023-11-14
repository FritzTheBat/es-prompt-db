<script lang="ts">
  import type { Provider } from "@supabase/supabase-js";
  import { supabase } from "./db";
  import { page } from "$app/stores";
  import { _ } from "$lib/i18n";

  interface HelperText {
    error: boolean;
    text: string | null;
  }

  let email: string = "" // "legaltech@ebnerstolz.de";
  let password: string = "" // "yQEMJdyEAUX58FJ$";
  let helperText: HelperText = { error: null, text: null };

  const doStuff = (type) => {
    console.log(type);
  };
  const handleLogin = async (type) => {
    const {
      data: { user },
      error,
    } =
      type === "LOGIN"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      helperText = { error: true, text: error.message };
    } else if (!user && !error) {
      helperText = {
        error: false,
        text: "An email has been sent to you for verification!",
      };
    }
  }

  const handleOAuthLogin = async (provider: Provider) => {
    // You need to enable the third party auth you want in Authentication > Settings
    // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
    let { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.log("Error: ", error.message);
  }


  $: hasExpiredLink = $page.url.toString().includes("expired")

</script>

<div class="flex flex-col w-full">

  {#if hasExpiredLink}
    <div class="alert">Leider ist ihr Login Link abgelaufen</div>
  {/if}

  <form class="flex flex-col w-full">
    <label class="mt-3 mb-2 font-medium text-lg" for="email">
      <span class="font-mono mr-1 text-red-400">*</span>Email:
    </label>
    <input
            id="email"
            class="input w-full input-bordered"
            type="email"
            name="email"
            bind:value={email}
            required
    />
    <label class="mt-3 mb-2 font-medium text-lg" for="password">
      <span class="font-mono mr-1 text-red-400">*</span>Password:
    </label>
    <input
            id="password"
            class="input w-full input-bordered"
            type="password"
            name="password"
            on:keypress={(e) => {
              if (e.key === "Enter") {
                handleLogin("LOGIN");
              }
            }}
            bind:value={password}
            required
    />
  </form>
  {#if !!helperText.text}
    <div
      class="border px-1 py-2 my-2 text-center text-sm {helperText.error
        ? 'bg-red-100 border-red-300 text-red-400'
        : 'bg-green-100 border-green-300 text-green-500'}"
    >
      {helperText.text}
    </div>
  {/if}
  <div class="mt-10 gap-2 flex">
<!--    <span class="block  w-full">-->
<!--      <button-->
<!--        type="submit"-->
<!--        on:click={() => handleLogin("REGISTER")}-->
<!--        class="btn w-full"-->
<!--      >-->
<!--        Sign Up-->
<!--      </button>-->
<!--    </span>-->
    <span class="block w-full">
      <button
        on:click={() => handleLogin("LOGIN")}
        type="button"
        class="btn btn-primary  w-full">
        {$_('Login', 'Logge dich ein')}
      </button>
    </span>
  </div>
<!--  <div class="mt-3">-->
<!--    <div class="relative">-->
<!--      <div class="absolute inset-0 flex items-center">-->
<!--        <div class="w-full mx-1.5 border-t border-gray-300" />-->
<!--      </div>-->
<!--      <div class="relative flex justify-center text-sm leading-5">-->
<!--        <span class="px-2 bg-white text-gray-500"> Or continue with </span>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div>-->
<!--      <div class="mt-3">-->
<!--        <span class="block rounded-md shadow-sm">-->
<!--          <button-->
<!--            on:click={() => handleOAuthLogin("github")}-->
<!--            type="button"-->
<!--            class="w-3/4 mx-auto flex justify-center py-2 px-4 btn-primary"-->
<!--          >-->
<!--            GitHub-->
<!--          </button>-->
<!--        </span>-->
<!--      </div>-->
<!--      <div class="mt-3">-->
<!--        <span class="block rounded-md shadow-sm">-->
<!--          <button-->
<!--            on:click={() => handleOAuthLogin("google")}-->
<!--            type="button"-->
<!--            class="w-3/4 mx-auto flex justify-center py-2 px-4 btn-primary"-->
<!--          >-->
<!--            Google-->
<!--          </button>-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  </div>
