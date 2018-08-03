<template>
    <panel title='Youtube'>
        <youtube :video-id="youtubeId" :player-width='720' :player-height='300'></youtube>
    </panel>
</template>
<script>
import Panel from '@/components/Panel'
export default {
  props: [
    'youtubeId'
  ],
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
