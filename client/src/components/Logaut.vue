<template>
  
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'

export default {
  name: "Logaut",
  components: {},
  methods: {
    ...mapMutations(["CLEAR_AUTH_DATA"])
  },
  created() {
    this.CLEAR_AUTH_DATA()
    this.$router.push('/')
  }
};
</script>