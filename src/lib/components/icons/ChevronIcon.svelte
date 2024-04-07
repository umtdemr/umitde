<script lang="ts">
    export let side: "left" | "right";

    export let width: number = 7;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 18 30" fill="none" style={`width: ${width}px`}>
    {#if side === "left"}
        <path d="M15.2444 30L0.833252 15.4167L15.2444 0.833344L17.1666 2.77852L4.67767 15.4167L17.1666 28.0548L15.2444 30Z" fill="white"/>
    {:else}
        <path d="M2.08887 30L16.5 15.4167L2.08887 0.833344L0.166666 2.77852L12.6556 15.4167L0.166666 28.0548L2.08887 30Z" fill="white"/>
    {/if}
</svg>