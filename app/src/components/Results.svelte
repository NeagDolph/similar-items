<script>
    import {image, uploadInProgress, category, score} from "../helpers/store";
    import axios from "axios";
    import Product from "./Product.svelte";
    import {fade} from 'svelte/transition';

    export let config;

    let results;
    let alert = {
        text: "",
        show: false
    }

    function showAlert(message, time) {
        alert = {
            text: message,
            show: true
        }

        setTimeout(() => alert.show = false, time)
    }

    $: {
        let bodyFormData = new FormData();
        bodyFormData.append("file", $image);
        console.log("e", config)
        axios({
            method: 'post',
            url: config.api.url + Object.entries(config.api.keys).map((el, idx) => `${idx >= 1 ? "&" : "?"}${el[0]}=${el[1]}`),
            data: bodyFormData
        })
            .then(res => {
                if (res.data.length >= 1) {
                    let data = res.data[0]
                    category.set(data.label);
                    score.set(data.score)
                    results = data.recommendations
                } else {
                    showAlert(config.error.similar, 3000)
                }
                uploadInProgress.set(false);
            })
    }


</script>

<slot>
    {#if alert.show}<p class="alert" transition:fade={{duration: 500}}>{alert.text}</p>{/if}

    {#if results}
        <div class="resultsWrapper">
            {#each results as result}
                <Product data={result} config={config}/>
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

  .alert {
    color: #f57474;
  }
</style>