<script>
    import {image, uploaded, preview} from "../helpers/store";
    import {fade} from 'svelte/transition';

    let inputElement
    let selectedImage
    let imageSrc
    let alert = {
        text: "",
        show: false
    }
    let draggedOn = false;

    function showAlert(message, time) {
        alert = {
            text: message,
            show: true
        }

        setTimeout(() => alert.show = false, time)
    }

    function selectImage() {
        selectedImage = this.files[0]

        if (!selectedImage.type.includes("image")) {
            showAlert("Uploaded file must be image", 500);
            return
        }

        image.set(selectedImage)
        uploaded.set(true)

        //Turn selected file into previewable image and save to store
        let reader = new FileReader();

        reader.onload = function (e) {
            preview.set(e.target.result);
        }

        reader.readAsDataURL(selectedImage);
    }

    function handleFile(node) {
        node.addEventListener("change", selectImage, false)
    }

    //Handle file drag and drop
    function dragUpload(node) {
        let dragenter = () => draggedOn = true;
        let dragleave = () => draggedOn = false;
        let dragover = () => draggedOn = true;


        function drop(e) {
            e.preventDefault();
            e.stopPropagation();
            draggedOn = false;
            selectImage.call(e.dataTransfer);
        }

        function preventDefaults (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        node.addEventListener('dragenter', dragenter, false)
        node.addEventListener('dragexit', dragleave, false)
        node.addEventListener('dragover', dragover, false)
        node.addEventListener('drop', drop, false)

        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            node.addEventListener(eventName, preventDefaults, false)
        })
    }
</script>

<main>
    <!-- Select Image Button -->
    <div class="largerUpload" class:draggedOn={draggedOn} use:dragUpload>
        <div class:visible={draggedOn} class="dragScreen"></div>
        <div class="uploadText">
            <div class="title">Similarity Search</div>
            <div class="subtitle desktop-subtitle">Drag and drop or select an image to view similar products</div>
            <div class="subtitle touch-subtitle">Select an image to view similar products</div>
        </div>

        <div class="select" on:click={() => inputElement.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path><polyline points="7 9 12 4 17 9"></polyline><line x1="12" y1="4" x2="12" y2="16"></line></svg>
            Select Image
        </div>
    </div>


    <!-- Alert -->
    {#if alert.show}
        <p transition:fade={{duration: 500}}>{alert.text}</p>
    {/if}
    <input accept="image/*" bind:this={inputElement} type="file" use:handleFile>
</main>

<style type="text/scss">
  .largerUpload {
    align-items: center;
    background: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    margin: 20px auto;
    justify-content: center;
    max-width: 700px;
    padding: 30px;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    position: relative;

    .dragScreen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background-color: rgba(20,115,230,0.1);
      display: none;
      &.visible {
        display: block;
      }
    }

    &.draggedOn {
      border-color: rgb(38, 128, 235);
      //background-color: rgba(20,115,230,0.1);
      border-style: dashed;

    }

    .uploadText {
      .title {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
      }

      .subtitle {
        margin: 15px 0 55px;
        color: #515151;
        font-size: 17px;

      }

      .touch-subtitle {
        display: none;
      }
    }

    .select {
      white-space: nowrap;
      padding: 9px 15px;
      background: rgb(20, 115, 230);
      border-radius: 2em;
      font-weight: bold;
      color: white;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 3em;
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
        width: 24px;
      }
    }
  }

  input {
    display: none;
  }



  @media screen and (max-width: 800px) {
    .touch-subtitle {
      display: block !important;
    }

    .desktop-subtitle {
      display: none;
    }

    .select {
      margin-bottom: 1.5em !important;
    }
  }
</style>