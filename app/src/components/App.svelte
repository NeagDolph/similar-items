<script>
    import UploadButton from "./UploadButton.svelte"
    import Results from "./Results.svelte"
    import {uploaded} from "../helpers/store.js";
    import "../global.css";
    import config from "../config.json";
</script>

<main>
    <UploadButton config={config}/>
    {#if $uploaded}
        <Results config={config}/>
    {/if}
</main>

<style type="text/scss">
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>