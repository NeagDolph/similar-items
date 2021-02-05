<script>
    import {image, uploaded, preview, uploadInProgress, category, score} from "../helpers/store";
    import {fade} from 'svelte/transition';

    export let config;

    let inputElement
    let selectedImage
    let imageSrc
    let alert = {
        text: "",
        show: false
    }
    let draggedOn = false;
    let textColor
    let bgColor
    let previewImage = {complete: false}
    let colors = [
        {
            bg: "#001f3f",
            color: "hsla(210, 100%, 75%, 1.0)"
        },
        {
            bg: "#7FDBFF",
            color: "hsla(210, 100%, 75%, 1.0)"
        },
        {
            bg: "#3D9970",
            color: "hsla(153, 43%, 15%, 1.0)"
        },
        {
            bg: "#01FF70",
            color: "hsla(146, 100%, 20%, 1.0)"
        },
        {
            bg: "#FF851B",
            color: "hsla(28, 100%, 20%, 1.0)"
        },
        {
            bg: "#B10DC9",
            color: "hsla(292, 88%, 82%, 1.0)"
        },
    ]

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
            showAlert(config.error.filetype, 1500);
            return
        }

        uploadInProgress.set(true);
        image.set(selectedImage);
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

        function preventDefaults(e) {
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
        <div class="dragScreen" class:visible={draggedOn}></div>
        <div class="uploadText">
            <div class="title">Similarity Search</div>
            <div class="subtitle desktop-subtitle">Drag and drop or select an image to view similar products</div>
            <div class="subtitle touch-subtitle">Select an image to view similar products</div>
        </div>

        {#if $preview}
            <div class="preview">
                <img src={$preview} alt={$category}>
                {#if $category}
                    <div class="categoryTitle">
                        {$category}
                        <span class="titleMatch">{Math.round($score * 100)}% match</span>
                    </div>
                {/if}
            </div>
        {/if}

        {#if !$uploadInProgress}
            <div class="select" on:click={() => inputElement.click()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                    <polyline points="7 9 12 4 17 9"></polyline>
                    <line x1="12" y1="4" x2="12" y2="16"></line>
                </svg>
                Select Image
            </div>
        {:else}
            <div class="select" class:uploading={$uploadInProgress}>
                <div class="loadingDots">
                    <div class="dot dot1"></div>
                    <div class="dot dot2"></div>
                    <div class="dot dot3"></div>
                </div>
            </div>
        {/if}

        <!-- Alert -->
        {#if alert.show}<p class="alert" transition:fade={{duration: 500}}>{alert.text}</p>{/if}
    </div>
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
      background-color: rgba(20, 115, 230, 0.1);
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
        margin: 15px 0 35px;
        color: #515151;
        font-size: 17px;

      }

      .touch-subtitle {
        display: none;
      }
    }

    .preview {
      height: 13em;
      margin: 0px 0 25px;
      width: fit-content;
      display: flex;
      position: relative;
      justify-content: center;


      img {
        height: 100%;
        max-width: 60vw;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 6px 0px;
        border-radius: 5px;
      }

      .categoryTitle {
        display: flex;
        flex-direction: column;

        .titleMatch {
          width: 100%;
          font-weight: 300;
          color: #2b2b2b;
          font-size: 11px;
        }

        position: absolute;
        top: calc(100% - 20px);
        padding: 5px 19px;
        color: #111111;
        font-size: 13px;
        font-weight: 700;
        background: #fef9ec;
        border-radius: 10px;
        text-align: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

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
      margin-bottom: 1.5em;
      margin-top: 25px;
      display: flex;
      align-items: center;
      width: 10.5em;
      height: 3em;
      justify-content: center;

      &.uploading {
        margin-top: 10px !important;
      }

      svg {
        margin-right: 5px;
        width: 24px;
      }

      .loadingDots {
        .dot {
          width: 14px;
          height: 14px;
          border-radius: 20px;
          background-color: white;
          color: white;
          display: inline-block;
          margin: 0 auto;
          transform: translateY(0px);
          animation: loadingAnimation 1s infinite ease-in-out;

          &.dot1 {
            animation-delay: 0s;
          }

          &.dot2 {
            animation-delay: 0.1s;
          }

          &.dot3 {
            animation-delay: 0.2s;
          }
        }

        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 20px;
      }
    }
  }

  input {
    display: none;
  }

  .alert {
    color: #f57474;
  }


  @keyframes loadingAnimation {
    0% {
      opacity: 0;
      transform: translateY(-15px);
    }
    25%, 50%, 75% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(15px);
    }
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