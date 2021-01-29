<script>
    import {image, preview, uploaded} from "../helpers/store";
    import axios from "axios";
    import Product from "./Product.svelte";

    let results;

    $: if (!results) {
        let bodyFormData = new FormData();
        bodyFormData.append("file", $image);
        axios({
            method: 'post',
            url: 'https://vgl-poc.blackstrawlab.com/upload?api_key=E935D32B761D564A1888F2A11712D',
            data: bodyFormData
        })
            .then(res => {
                //Remove duplicate
                results = res.data[1].recommendations
                console.log(results, res.data[0].recommendations)
            })
    }


</script>

<slot>
    {#if results}
        <div>
            {#each results as result}
                <Product data={result}/>
            {/each}
        </div>
    {:else}
        <h1>Loading...</h1>
    {/if}
</slot>

<style type="text/scss">
  div {
    display: flex;
    flex-direction: row;

    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;

  }
</style>