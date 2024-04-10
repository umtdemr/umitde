<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import Modal from "$lib/components/Modal/Modal.svelte";
    import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
    import {beforeNavigate} from "$app/navigation";
    import type {PostWithPath} from "$lib/types";

    const dispatch = createEventDispatcher();

    let timer: number;

    let inputEl: HTMLInputElement;

    let searchTerm: string;

    let message: string;

    let posts: PostWithPath = [];

    function handleCloseModal() {
        dispatch("changeSearchModalStatus", {
            status: false
        })
    }

    const searchPosts = async () => {
        message = "";
        try {
            posts.length = 0;
            clearTimeout(timer);
            timer = setTimeout(async () => {
                if (!searchTerm) {
                    return;
                }

                const query = encodeURI(searchTerm)
                const response = await fetch(`/api/posts?s=${query}`);
                const postsResponse = await response.json();
                posts.length = 0;
                if (postsResponse.length) {
                    posts.push(...postsResponse);
                } else {
                    message = "No post found"
                }
            }, 500)
        } catch (err) {
            console.error(err);
            message = "error while searching"
        }
    }

    beforeNavigate(() => {
        handleCloseModal();
    })
    onMount(() => {
        inputEl.focus();
    })
</script>

<Modal on:closeModal={handleCloseModal}>
    <div class="search_modal">
        <div class="search_modal__input_wrapper">
            <button aria-label="search" class="search_modal__icon" on:click={(e) => {
                e.preventDefault();
                searchPosts()
            }}>
                <SearchIcon />
            </button>
            <input
                    type="search"
                    placeholder="Search in blog"
                    bind:this={inputEl}
                    bind:value={searchTerm}
                    on:input={searchPosts}
            />

        </div>
        <div class="search_modal__results">
            {#if message}
                <div class="result_item">{message}</div>
            {/if}
            {#each posts as post}
                <a href={`/blog/${post?.slug}`} class="result_item">{post?.title}</a>
            {/each}
        </div>
    </div>
</Modal>


<style lang="scss">
    .search_modal {
      z-index: 999999;
      width: 440px;
      background-color: var(--color-modal-dark-bg);
      color: var(--color-text-2);
      position: absolute;
      left: 50%;
      top: 250px;
      transform: translateX(-50%);
      border-radius: 15px;
      &__input_wrapper {
        position: relative;
      }
      &__icon {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
      }
      input {
        background-color: transparent;
        border: none;
        padding: 20px 20px 20px 50px;
        color: var(--color-text-2);
        width: 100%;
        border-radius: 15px;
        font-size: 16px;
        &:focus-within {
          outline: 1px solid var(--color-blue);
        }
        &::-webkit-search-cancel-button {
          -webkit-appearance: none;
          appearance: none;
          height: 10px;
          width: 10px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTIzLjA1cHgiIGhlaWdodD0iMTIzLjA1cHgiIHZpZXdCb3g9IjAgMCAxMjMuMDUgMTIzLjA1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMjMuMDUgMTIzLjA1O2ZpbGw6ICNmZmY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTIxLjMyNSwxMC45MjVsLTguNS04LjM5OWMtMi4zLTIuMy02LjEtMi4zLTguNSwwbC00Mi40LDQyLjM5OUwxOC43MjYsMS43MjZjLTIuMzAxLTIuMzAxLTYuMTAxLTIuMzAxLTguNSwwbC04LjUsOC41ICAgYy0yLjMwMSwyLjMtMi4zMDEsNi4xLDAsOC41bDQzLjEsNDMuMWwtNDIuMyw0Mi41Yy0yLjMsMi4zLTIuMyw2LjEsMCw4LjVsOC41LDguNWMyLjMsMi4zLDYuMSwyLjMsOC41LDBsNDIuMzk5LTQyLjRsNDIuNCw0Mi40ICAgYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
          background-size: 10px 10px;
        }
      }
      &__results {
        width: 100%;
        display: flex;
        flex-direction: column;
        .result_item {
          width: 100%;
          display: block;
          padding: 13px 23px;
          border-radius: 15px;
          color: var(--color-text-2);
          &:hover {
            color: var(--color-text-1);
          }
        }
      }
      @media screen and (max-width: 790px) {
        width: calc(100% - 35px);
      }
    }
</style>