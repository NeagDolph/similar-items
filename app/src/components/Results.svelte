<script>
    import {image, uploadInProgress} from "../helpers/store";
    import axios from "axios";
    import Product from "./Product.svelte";

    let results;

    $: {
        let bodyFormData = new FormData();
        bodyFormData.append("file", $image);
        axios({
            method: 'post',
            url: 'https://vgl-poc.blackstrawlab.com/upload?api_key=E935D32B761D564A1888F2A11712D',
            data: bodyFormData
        })
            .then(res => {
                results = res.data[1].recommendations
                uploadInProgress.set(false);
            })
    }


</script>

<slot>
    {#if results}
        <div class="resultsWrapper">
            {#each results as result}
                <Product data={result}/>
            {/each}
        </div>
    {/if}
</slot>

<style type="text/scss">
  .resultsWrapper {
    display: flex;
    flex-direction: row;

    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;

  }
</style>