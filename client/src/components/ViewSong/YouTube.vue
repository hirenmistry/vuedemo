<template>
    <panel title='Youtube'>
        <youtube :video-id="youtubeId" :player-width='720' :player-height='300'></youtube>
    </panel>
</template>
<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>

</style>
