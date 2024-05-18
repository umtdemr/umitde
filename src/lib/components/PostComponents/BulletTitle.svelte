<script lang="ts">
    
    export let text: string; 
    export let htmlTag: string;
</script>

{@html `<${htmlTag} class="bullet-title">${text}</${htmlTag}>`}