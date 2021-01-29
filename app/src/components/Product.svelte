<script>
    export let data;
</script>

<slot>
    <div class="product">
        <div class="imageWrapper">
            <a href={`https://www.shoplc.com/p/${data.sku}`} target="_blank">
                <img src="{data.image_url}" alt={data.caption}>
            </a>
        </div>
        <a href={`https://www.shoplc.com/p/${data.sku}`} target="_blank">
            <div class="descriptionWrapper">
                <div class="clampWrapper">
                    {data.caption}
                </div>
                <div class="visitButton">
                    <div class="iconWrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="15" y2="15"></line></svg>
                        View Item
                    </div>
                </div>
            </div>
        </a>
    </div>
</slot>

<style type="text/scss">
  .product {
    width: 12em;
    height: 16em;
    //border: solid 1px #c3c3c3;
    border-radius: 6px;
    margin: 1em;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    .imageWrapper {
      position: relative;
      padding: 5px;

      img {
        display: block;
        margin: 0 auto;
        height: 9em;
      }
    }

    a {
      .descriptionWrapper {
        padding: 0 10px;

        .clampWrapper {
          font-size: 12px;
          color: #333333;
          min-height: 4.5em;
          line-height: 1.5em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      &:hover {
        text-decoration: none;
      }
    }

    .visitButton {
      display: flex;
      align-items: center;
      justify-content: center;
      .iconWrapper {
        svg {
          width: 16px;
          height: 16px;
          fill: white;
          transform: translateY(2px);
        }
        width: fit-content;

      }
      width: 8em;
      height: 2.5em;
      margin: 5px auto;
      line-height: 2em;
      background: #509de4;;
      border: solid 1px #5aacf7;
      color: white;
      font-size: 12px;
      border-radius: 5px;
      transition: all 0.5s;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

      &:hover {
        background: #207fd7;
      }

    }
  }

  @media (max-width: 800px) {
    .product {
      width: 28em;
      height: 12em;
      display: flex;

      .imageWrapper {
        height: 100%;
        width: fit-content;

        img {
          height: 100%;
          max-height: 12em;
          width: unset;
        }
      }

      .descriptionWrapper {
        height: 100%;
        .clampWrapper {
          margin-top: 20px;
          text-align: left;
          height: 4.5em;
          padding: 0px 0px 0 10px;
        }

        .visitButton {
          margin: 25px 10px;
          font-size: 15px;
        }
      }

    }
  }

  @media (max-width: 500px) {
    .product {
      height: 30vw;
      margin: 0.5em;

      .descriptionWrapper {
        display: block;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .clampWrapper {
          height: unset;
          margin-top: 0px;

        }

        .visitButton {
          margin: 5px 10px;
        }
      }
    }
  }

  @media (max-width: 400px) {
    .product {

      .descriptionWrapper {
        padding: 0;
        .clampWrapper {
          font-size: 3vw;

        }

        .visitButton {
          display: none;
        }
      }
    }
  }
</style>